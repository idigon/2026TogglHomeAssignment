"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, CalendarSm, Kebab, Pencil, X } from "@/components/Icons";
import { ASK_TOGGL } from "@/lib/timerData";

type Props = {
  open: boolean;
  onClose: () => void;
};

/**
 * The Ask Toggl panel.
 *
 * A dead end, deliberately, like every other unbuilt route here — it answers
 * once and has nothing else to say. Only two controls do anything: send, and
 * close. The rest are present because the real panel has them, and leaving
 * them out would make the panel look like something other than what it is.
 *
 * It takes layout space rather than floating over the week, so the calendar
 * narrows the way it does in the live app.
 */
export default function AskToggl({ open, onClose }: Props) {
  const [draft, setDraft] = useState("");
  const [asked, setAsked] = useState<string | null>(null);
  const [thinking, setThinking] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Esc closes, as it does everywhere else in the app.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const send = () => {
    const question = draft.trim();
    if (!question || thinking) return;
    setAsked(question);
    setDraft("");
    setThinking(true);
    // A pause, so the answer reads as considered rather than canned.
    timer.current = setTimeout(() => setThinking(false), ASK_TOGGL.delayMs);
  };

  return (
    <aside className={`at${open ? " open" : ""}`} aria-hidden={!open}>
      <div className="at-inner">
        <div className="at-head">
          <Pencil size={15} />
          <span className="at-title">New chat</span>
          <div className="spacer" />
          <button className="at-icon" aria-label="Chat options">
            <Kebab size={14} />
          </button>
          <button className="at-icon" aria-label="Close chat" onClick={onClose}>
            <X size={14} />
          </button>
        </div>

        <div className="at-body">
          {asked === null ? (
            <>
              <span className="at-label">Toggl AI</span>
              <p className="at-welcome">{ASK_TOGGL.welcome}</p>
              <ul className="at-prompts">
                {ASK_TOGGL.prompts.map((p) => (
                  <li key={p}>
                    <span className="at-arrow" aria-hidden>
                      →
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="at-thread">
              <div className="at-you">{asked}</div>
              <span className="at-label">Toggl AI</span>
              {thinking ? (
                <p className="at-thinking" aria-live="polite">
                  <span />
                  <span />
                  <span />
                </p>
              ) : (
                <p className="at-answer" aria-live="polite">
                  {ASK_TOGGL.answer}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="at-composer">
          <span className="at-context">
            <CalendarSm size={12} />
            Calendar
          </span>
          <textarea
            ref={inputRef}
            className="at-input"
            rows={2}
            value={draft}
            placeholder={ASK_TOGGL.placeholder}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
          />
          <button
            className="at-send"
            aria-label="Send"
            disabled={!draft.trim() || thinking}
            onClick={send}
          >
            <ArrowUp size={15} />
          </button>
        </div>

        <div className="at-foot">
          <span className="at-beta">BETA</span>
          AI can make mistakes. Verify important results.
        </div>
      </div>
    </aside>
  );
}
