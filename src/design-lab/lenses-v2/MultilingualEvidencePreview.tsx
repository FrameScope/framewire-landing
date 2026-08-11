import { useState } from "react";
import { Languages, ShieldCheck } from "lucide-react";
import {
  languageOptions,
  sourceOptions,
  type EvidenceLanguage,
  type EvidenceSourceType,
  type MultilingualEvidenceItem,
} from "./multilingualEvidenceData";

export type SourceFilter = "all" | EvidenceSourceType;
export type LanguageFilter = "all" | EvidenceLanguage;
export type EvidenceViewMode = "original" | "translation" | "both";

export function MultilingualFilterBar({
  sourceFilter,
  languageFilter,
  onSourceChange,
  onLanguageChange,
}: {
  sourceFilter: SourceFilter;
  languageFilter: LanguageFilter;
  onSourceChange: (value: SourceFilter) => void;
  onLanguageChange: (value: LanguageFilter) => void;
}) {
  return (
    <div className="ml-filter-bar" aria-label="Evidence filters">
      <div role="group" aria-label="Filter by source type">
        {sourceOptions.map((option) => (
          <button key={option.value} type="button" aria-pressed={sourceFilter === option.value} onClick={() => onSourceChange(option.value)}>{option.label}</button>
        ))}
      </div>
      <div role="group" aria-label="Filter by language">
        {languageOptions.map((option) => (
          <button key={option.value} type="button" lang={option.value === "ne" ? "ne" : option.value === "hi" ? "hi" : "en"} aria-pressed={languageFilter === option.value} onClick={() => onLanguageChange(option.value)}>{option.label}</button>
        ))}
      </div>
    </div>
  );
}

export function MultilingualEvidencePreview({
  item,
  context,
  boundary,
  selectionLabel = "SELECTED EVIDENCE",
  selectionTitle,
  selectionSummary,
  viewMode: controlledMode,
  onViewModeChange,
}: {
  item: MultilingualEvidenceItem;
  context: Array<{ label: string; value: string; state?: "supported" | "qualified" | "missing" | "contested" }>;
  boundary: string;
  selectionLabel?: string;
  selectionTitle?: string;
  selectionSummary?: string;
  viewMode?: EvidenceViewMode;
  onViewModeChange?: (mode: EvidenceViewMode) => void;
}) {
  const [internalMode, setInternalMode] = useState<EvidenceViewMode>("original");
  const mode = controlledMode ?? internalMode;
  const setMode = (next: EvidenceViewMode) => {
    setInternalMode(next);
    onViewModeChange?.(next);
  };
  const hasTranslation = Boolean(item.translation);

  return (
    <aside className="ml-evidence-preview" aria-label={`Selected ${item.languageLabel} evidence`}>
      <header>
        <div>
          <span>{selectionLabel}</span>
          <strong>{selectionTitle ?? item.semanticLabel}</strong>
          <p><b lang={item.language}>{item.languageLabel}</b><i aria-hidden="true" />{item.carrierLabel}</p>
          {selectionSummary && <small>{selectionSummary}</small>}
        </div>
        <Languages size={19} aria-hidden="true" />
      </header>

      <div className="ml-language-mode" role="group" aria-label="Evidence language view">
        {(["original", "translation", "both"] as EvidenceViewMode[]).map((option) => (
          <button key={option} type="button" aria-pressed={mode === option} disabled={!hasTranslation && option !== "original"} onClick={() => setMode(option)}>{option[0].toUpperCase() + option.slice(1)}</button>
        ))}
      </div>

      <div className="ml-evidence-text">
        {(mode === "original" || mode === "both") && (
          <section>
            <span>ORIGINAL</span>
            <blockquote lang={item.language}>{item.originalText}</blockquote>
          </section>
        )}
        {hasTranslation && (mode === "translation" || mode === "both") && (
          <section className="translation">
            <span>ENGLISH TRANSLATION · DERIVED VIEW</span>
            <blockquote lang="en">{item.translation}</blockquote>
          </section>
        )}
      </div>

      <dl>
        {context.map((entry) => <div key={entry.label} data-state={entry.state}><dt>{entry.label}</dt><dd>{entry.value}</dd></div>)}
      </dl>

      <footer><ShieldCheck size={16} aria-hidden="true" /><div><strong>AUTHORITY BOUNDARY</strong><p>{boundary}</p></div></footer>
    </aside>
  );
}
