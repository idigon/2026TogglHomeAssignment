"use client";

import { CheckCircle, ChevronDown, EmptyCircle, Rocket } from "@/components/Icons";

export type ChecklistStep = {
  label: string;
  /** Optional second line, the way Toggl's own items say what they unlock. */
  sub?: string;
  done: boolean;
};

type Props = {
  steps: ChecklistStep[];
  collapsed: boolean;
  onToggle: () => void;
};

/**
 * Toggl's "Get started" checklist, in the sidebar above the footer.
 *
 * It tracks the same three beats the rest of the prototype is built around, so
 * a cold evaluator has somewhere to look that says what to do next without a
 * tour or a tooltip. The third item completing is the end of the demo, which
 * is why the panel folds itself away at that point rather than sitting there
 * fully ticked.
 */
export default function GetStarted({ steps, collapsed, onToggle }: Props) {
  const done = steps.filter((s) => s.done).length;

  return (
    <div className="gs">
      <button
        className="gs-head"
        aria-expanded={!collapsed}
        aria-controls="gs-list"
        onClick={onToggle}
      >
        <Rocket size={14} className="gs-rocket" />
        <span className="gs-title">Get started</span>
        <span className="gs-count">
          {done}/{steps.length}
        </span>
        <ChevronDown size={14} className={collapsed ? undefined : "gs-flip"} />
      </button>

      {!collapsed && (
        <ul className="gs-list" id="gs-list">
          {steps.map((step) => (
            <li key={step.label} className={`gs-item${step.done ? " done" : ""}`}>
              <span className="gs-mark" aria-hidden>
                {step.done ? <CheckCircle size={14} /> : <EmptyCircle size={14} />}
              </span>
              <span className="gs-text">
                <span className="gs-label">{step.label}</span>
                {step.sub && <span className="gs-sub">{step.sub}</span>}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
