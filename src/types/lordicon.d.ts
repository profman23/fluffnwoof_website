interface LordIconElement extends HTMLElement {
  playerInstance?: {
    play: () => void;
    playFromBeginning: () => void;
    pause: () => void;
    stop: () => void;
    goToFirstFrame: () => void;
    goToLastFrame: () => void;
    isPlaying: boolean;
    isReady: boolean;
    addEventListener: (
      name: "complete" | "ready" | "frame",
      callback: () => void
    ) => () => void;
    removeEventListener: (
      name: "complete" | "ready" | "frame",
      callback?: () => void
    ) => void;
  };
}

declare namespace JSX {
  interface IntrinsicElements {
    "lord-icon": React.DetailedHTMLProps<
      React.HTMLAttributes<LordIconElement>,
      LordIconElement
    > & {
      src?: string;
      trigger?: string;
      delay?: string;
      colors?: string;
      stroke?: string;
      state?: string;
      target?: string;
      style?: React.CSSProperties;
    };
  }
}
