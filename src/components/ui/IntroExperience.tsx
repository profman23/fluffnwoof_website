"use client";

import { useState, useEffect, useRef } from "react";
import { IntroVideo } from "./IntroVideo";
import { WelcomePopup } from "./WelcomePopup";
import { FloatingArabNews } from "../layout/FloatingArabNews";

const WELCOME_STORAGE_KEY = "fluffnwoof_popup_dismissed";

type Stage = "idle" | "intro" | "popup" | "replay";

/**
 * Orchestrates the entry experience on every page load:
 *   1. Arab News intro video (autoplay, muted, skippable) — shown EVERY visit
 *   2. shrinks into the floating button, then the doctors WelcomePopup opens
 *      (unless the visitor previously chose "don't show again")
 *   3. the floating button replays the video on demand (with sound/controls)
 */
export function IntroExperience() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [justReceived, setJustReceived] = useState(false);
  // Whether the doctors popup should open after the intro (respects opt-out).
  const showPopupAfterIntro = useRef(true);

  useEffect(() => {
    // Intro plays on every visit.
    setStage("intro");
    // But honor the "don't show again" choice for the doctors popup.
    showPopupAfterIntro.current =
      localStorage.getItem(WELCOME_STORAGE_KEY) !== "true";
  }, []);

  // Read the floating button's *live* position at the moment the video closes,
  // so the minimize-into-button animation always targets the right spot.
  const getTargetRect = () =>
    buttonRef.current ? buttonRef.current.getBoundingClientRect() : null;

  const handleIntroClose = () => {
    setStage(showPopupAfterIntro.current ? "popup" : "idle");

    // Fire the "received" pop on the button as the video lands in it.
    setJustReceived(true);
    setTimeout(() => setJustReceived(false), 600);
  };

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
        open={stage === "intro"}
        mode="intro"
        onClose={handleIntroClose}
        getTargetRect={getTargetRect}
      />

      <IntroVideo
        open={stage === "replay"}
        mode="replay"
        onClose={handleReplayClose}
        getTargetRect={getTargetRect}
      />

      <WelcomePopup open={stage === "popup"} onClose={handlePopupClose} />

      <FloatingArabNews
        ref={buttonRef}
        onClick={handleReplay}
        justReceived={justReceived}
      />
    </>
  );
}
