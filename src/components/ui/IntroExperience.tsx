"use client";

import { useState, useEffect, useRef } from "react";
import { IntroVideo } from "./IntroVideo";
import { WelcomePopup } from "./WelcomePopup";
import { FloatingArabNews } from "../layout/FloatingArabNews";

const WELCOME_STORAGE_KEY = "fluffnwoof_popup_dismissed";

type Stage = "idle" | "popup" | "replay";

/**
 * Orchestrates the entry experience on every page load:
 *   1. The doctors WelcomePopup opens on load (unless the visitor previously
 *      chose "don't show again").
 *   2. The floating Arab News button replays the feature video on demand
 *      (with sound/controls). The video no longer auto-plays on load.
 */
export function IntroExperience() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [stage, setStage] = useState<Stage>("idle");

  useEffect(() => {
    // Open the doctors popup on load, honoring the "don't show again" choice.
    // Defer the state update out of the synchronous effect body to avoid the
    // cascading-render warning; localStorage is only available client-side.
    const dismissed = localStorage.getItem(WELCOME_STORAGE_KEY) === "true";
    if (dismissed) return;
    const id = requestAnimationFrame(() => setStage("popup"));
    return () => cancelAnimationFrame(id);
  }, []);

  // Read the floating button's *live* position at the moment the video closes,
  // so the minimize-into-button animation always targets the right spot.
  const getTargetRect = () =>
    buttonRef.current ? buttonRef.current.getBoundingClientRect() : null;

  const handlePopupClose = () => {
    setStage("idle");
  };

  const handleReplay = () => {
    setStage("replay");
  };

  const handleReplayClose = () => {
    setStage("idle");
  };

  return (
    <>
      <IntroVideo
        open={stage === "replay"}
        mode="replay"
        onClose={handleReplayClose}
        getTargetRect={getTargetRect}
      />

      <WelcomePopup open={stage === "popup"} onClose={handlePopupClose} />

      <FloatingArabNews ref={buttonRef} onClick={handleReplay} />
    </>
  );
}
