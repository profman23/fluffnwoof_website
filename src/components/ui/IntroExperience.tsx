"use client";

import { useState, useRef } from "react";
import { IntroVideo } from "./IntroVideo";
import { FloatingArabNews } from "../layout/FloatingArabNews";

type Stage = "idle" | "replay";

/**
 * Orchestrates the on-demand entry experience:
 *   The floating Arab News button replays the feature video on demand
 *   (with sound/controls). The video does not auto-play on load.
 *
 * The doctors WelcomePopup no longer auto-opens here — it is now reachable
 * from the in-page DoctorsSection card (between Hero and Services).
 */
export function IntroExperience() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [stage, setStage] = useState<Stage>("idle");

  // Read the floating button's *live* position at the moment the video closes,
  // so the minimize-into-button animation always targets the right spot.
  const getTargetRect = () =>
    buttonRef.current ? buttonRef.current.getBoundingClientRect() : null;

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

      <FloatingArabNews ref={buttonRef} onClick={handleReplay} />
    </>
  );
}
