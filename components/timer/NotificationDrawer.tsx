"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, Check, ChevronDown, Gear, X } from "@/components/Icons";
import type { AppNotification } from "./types";

export type NotificationFilter = "Unread" | "Read";

const FILTERS: NotificationFilter[] = ["Unread", "Read"];

type Props = {
  notifications: AppNotification[];
  filter: NotificationFilter;
  onFilter: (f: NotificationFilter) => void;
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
  onClose: () => void;
};

/**
 * Toggl's notification drawer, anchored above the bell in the sidebar rail.
 *
 * The learning progression lives here rather than in a ribbon of its own: the
 * product already has a surface for "the system concluded something", and
 * putting a second one above the calendar would have been an invention that
 * competed with it. The actual change still shows on the affected blocks — a
 * notification names the moment, it does not carry the work.
 */
export default function NotificationDrawer({
  notifications,
  filter,
  onFilter,
  onMarkRead,
  onMarkAllRead,
  onClose,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Click-away closes the filter menu, as a menu should.
  useEffect(() => {
    if (!menuOpen) return;
    const away = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", away);
    return () => document.removeEventListener("mousedown", away);
  }, [menuOpen]);

  const unread = notifications.filter((n) => !n.read);
  const shown = filter === "Unread" ? unread : notifications.filter((n) => n.read);

  return (
    <div className="nd" role="dialog" aria-label="Notifications">
      <div className="nd-head">
        <span className="nd-title">Notifications</span>
        {unread.length > 0 && <span className="nd-count">{unread.length}</span>}

        <div className="nd-select" ref={menuRef}>
          <button
            className="nd-filter"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {filter}
            <ChevronDown size={13} />
          </button>

          {menuOpen && (
            <div className="nd-menu" role="menu">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  role="menuitemradio"
                  aria-checked={filter === f}
                  className={`nd-option${filter === f ? " on" : ""}`}
                  onClick={() => {
                    onFilter(f);
                    setMenuOpen(false);
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="spacer" />
        <button className="nd-icon" aria-label="Notification settings">
          <Gear size={15} />
        </button>
        <button className="nd-icon" aria-label="Close" onClick={onClose}>
          <X size={14} />
        </button>
      </div>

      <div className="nd-list">
        {shown.length === 0 ? (
          <p className="nd-empty">
            {filter === "Unread" ? "Nothing unread." : "Nothing read yet."}
          </p>
        ) : (
          shown.map((n) => (
            /*
             * An unread notification is readable two ways: click it, or click
             * the tick that appears on hover. Read ones are inert.
             */
            <div
              key={n.id}
              className={`nd-item nd-${n.kind}${n.read ? " read" : " unread"}`}
              role={n.read ? undefined : "button"}
              tabIndex={n.read ? undefined : 0}
              onClick={() => !n.read && onMarkRead(n.id)}
              onKeyDown={(e) => {
                if (!n.read && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  onMarkRead(n.id);
                }
              }}
            >
              <span className="nd-avatar" aria-hidden>
                <Bell size={14} />
              </span>
              <div className="nd-body">
                <div className="nd-item-title">{n.headline}</div>
                <p className="nd-item-detail">{n.detail}</p>
                {/*
                 * The trigger, on the ones that have one: it is the number of
                 * logged entries that moves the estimates, not elapsed time.
                 */}
                {n.progress && <span className="nd-progress">{n.progress}</span>}
                <div className="nd-time">{n.time}</div>
              </div>

              {!n.read && (
                <button
                  className="nd-tick"
                  aria-label="Mark as read"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkRead(n.id);
                  }}
                >
                  <Check size={14} />
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {filter === "Unread" && unread.length > 0 && (
        <button className="nd-mark" onClick={onMarkAllRead}>
          <Check size={13} />
          Mark all as read
        </button>
      )}
    </div>
  );
}
