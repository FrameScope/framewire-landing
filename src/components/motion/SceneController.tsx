import { Icon } from "../ui/Icon";

/* Accessible stage controls: Previous · direct stage dots · Next · Replay · optional autoplay.
   Keyboard (←/→/Home/End) is owned by the host so it can scope to the stage region.
   See TECHNICAL_TOUR_MOTION_SYSTEM_AUDIT.md §11. */

interface SceneControllerProps {
  count: number;
  index: number;
  labels: string[];
  onPrev: () => void;
  onNext: () => void;
  onSelect: (i: number) => void;
  onReplay: () => void;
  autoplay: boolean;
  onToggleAutoplay: () => void;
}

export function SceneController({ count, index, labels, onPrev, onNext, onSelect, onReplay, autoplay, onToggleAutoplay }: SceneControllerProps) {
  return (
    <div className="msc-bar">
      <button className="msc-btn" onClick={onPrev} disabled={index === 0} aria-label="Previous scene">
        <Icon name="chevron-left" size={18} />
      </button>

      <div className="msc-dots" role="tablist" aria-label="Proof scenes">
        {labels.map((label, i) => (
          <button
            key={label}
            role="tab"
            aria-selected={i === index}
            aria-label={`${i + 1}. ${label}`}
            tabIndex={i === index ? 0 : -1}
            className={`msc-dot${i === index ? " on" : ""}${i < index ? " done" : ""}`}
            onClick={() => onSelect(i)}
          />
        ))}
      </div>

      <button className="msc-btn" onClick={onNext} disabled={index === count - 1} aria-label="Next scene">
        <Icon name="chevron-right" size={18} />
      </button>

      <span className="msc-sep" aria-hidden="true" />

      <button className="msc-btn" onClick={onReplay} aria-label="Replay this scene">
        <Icon name="rotate-ccw" size={16} />
      </button>
      <button
        className={`msc-btn${autoplay ? " on" : ""}`}
        onClick={onToggleAutoplay}
        aria-pressed={autoplay}
        aria-label={autoplay ? "Pause autoplay" : "Autoplay scenes"}
      >
        <Icon name={autoplay ? "pause" : "play"} size={16} />
      </button>
    </div>
  );
}
