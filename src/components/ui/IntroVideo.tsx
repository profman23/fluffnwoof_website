"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const VIDEO_SRC = "/videos/arabnews.mp4";
const ARTICLE_URL =
  "https://www.arabnews.com/node/2646843/business-economy";

type IntroVideoMode = "intro" | "replay";

interface IntroVideoProps {
  open: boolean;
  mode: IntroVideoMode;
  /** Called when the user skips, the video ends, or the overlay is dismissed. */
  onClose: () => void;
  /**
   * Returns the live bounding rect of the floating Arab News button. Called at
   * the moment the overlay starts closing, so the card can shrink toward the
   * button's *current* position ("minimize into button").
   */
  getTargetRect?: () => DOMRect | null;
}

type ExitTransform = {
  opacity: number;
  scale: number;
  x?: number;
  y?: number;
};

/**
 * Computes the framer-motion transform (x/y/scale) that moves the card's center
 * onto the target rect's center, shrunk to roughly button size.
 */
function transformToTarget(targetRect: DOMRect | null): ExitTransform {
  if (typeof window === "undefined" || !targetRect) {
    return { opacity: 0, scale: 0.4 };
  }
  const viewportCenterX = window.innerWidth / 2;
  const viewportCenterY = window.innerHeight / 2;
  const targetCenterX = targetRect.left + targetRect.width / 2;
  const targetCenterY = targetRect.top + targetRect.height / 2;
  return {
    x: targetCenterX - viewportCenterX,
    y: targetCenterY - viewportCenterY,
    scale: 0.1,
    opacity: 0,
  };
}

export function IntroVideo({
  open,
  mode,
  onClose,
  getTargetRect,
}: IntroVideoProps) {
  const t = useTranslations("intro");
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Internal visibility drives the exit animation. The parent owns `open`, but
  // we delay calling onClose until the shrink-to-button animation finishes.
  const [visible, setVisible] = useState(false);

  // The exit transform is read lazily by the motion element's `exit` function
  // at the moment of removal, so it always reflects the button's live position.
  const exitTransformRef = useRef<ExitTransform>({ opacity: 0, scale: 0.95 });
  // Bumping this forces AnimatePresence to re-read `custom` for the exit.
  const [exitTick, setExitTick] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync internal visibility with the parent-controlled `open`.
  useEffect(() => {
    if (open) setVisible(true);
  }, [open]);

  const isIntro = mode === "intro";

  // Time the first frame stays frozen before playback begins, in ms.
  const PLAYBACK_DELAY_MS = 1000;

  const startPlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    const p = video.play();
    if (p) p.catch(() => {});
  };

  // On open, show a frozen first frame, then start playing after a short pause.
  // The replay mode (user-initiated) plays right away. We poll on a short timer
  // so this still fires even though the <video> element mounts a tick later
  // (it only renders once `visible && open` is true).
  useEffect(() => {
    if (!open) return;

    const prepare = () => {
      const video = videoRef.current;
      if (!video) return false;
      video.currentTime = 0;
      video.pause();
      return true;
    };

    // Retry preparing the first frame until the element is mounted.
    let mountTimer: ReturnType<typeof setTimeout> | undefined;
    if (!prepare()) {
      mountTimer = setTimeout(prepare, 150);
    }

    const delay = isIntro ? PLAYBACK_DELAY_MS : 0;
    const playTimer = setTimeout(startPlayback, delay);

    return () => {
      clearTimeout(playTimer);
      if (mountTimer) clearTimeout(mountTimer);
    };
  }, [open, isIntro]);

  // Begin closing: compute the fresh exit transform, then hide (triggers exit).
  const handleClose = () => {
    if (prefersReducedMotion) {
      exitTransformRef.current = { opacity: 0, scale: 0.95 };
    } else {
      const rect = getTargetRect?.() ?? null;
      exitTransformRef.current = transformToTarget(rect);
    }
    setExitTick((n) => n + 1);
    setVisible(false);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence custom={exitTick} onExitComplete={onClose}>
      {visible && open && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          {/* Overlay — solid (no backdrop-blur) so video playback stays smooth.
              Fades on its own so the card stays fully visible while it flies. */}
          <motion.div
            className="absolute inset-0 bg-dark/80"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />

          {/* Video card — header frame on top, then the (portrait) video */}
          <motion.div
            className="relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
            style={{ transformOrigin: "center" }}
            custom={exitTick}
            variants={{
              initial: prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.9, y: 20 },
              enter: { opacity: 1, scale: 1, x: 0, y: 0 },
              // `exit` is a function variant: AnimatePresence calls it with the
              // current `custom` at removal time, so it reads the live target.
              exit: () => exitTransformRef.current,
            }}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{ duration: 1.1, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header frame: Arab News label (start) + Skip/Close (end) */}
            <div className="flex items-center justify-between gap-2 bg-white px-3 py-2">
              <span className="rounded-full bg-primary/20 px-3 py-1 text-[11px] font-semibold text-dark">
                {t("arabNewsBadge")}
              </span>

              <button
                onClick={handleClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-dark text-white shadow-md transition-colors hover:bg-dark/85"
                aria-label={isIntro ? t("skip") : t("close")}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <video
              ref={videoRef}
              src={VIDEO_SRC}
              className="block h-auto max-h-[72vh] w-auto max-w-[88vw] sm:max-w-sm"
              preload="auto"
              muted={isIntro}
              playsInline
              controls={!isIntro}
              onEnded={isIntro ? handleClose : undefined}
            />

            {/* Footer frame: link to the full Arab News article (AR + EN) */}
            <a
              href={ARTICLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-primary px-4 py-3 text-center text-dark transition-colors hover:bg-primary/85"
            >
              <span className="flex flex-col text-xs font-semibold leading-snug sm:text-sm">
                <span dir="rtl">اضغط هنا لقراءة المقال كاملاً</span>
                <span dir="ltr">Click here to read the full article</span>
              </span>
              <svg
                className="h-4 w-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
