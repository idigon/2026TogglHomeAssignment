"use client";

import { useState } from "react";
import { ChevronDown, ChevronLeft } from "@/components/Icons";
import { DEFAULT_PROFILE, ONBOARDING } from "@/lib/timerData";
import type { Profile } from "@/lib/timerData";

type Props = {
  /**
   * Called with the answers on Q3, and with null on Skip. Skipping is not the
   * same as accepting the defaults: with no cohort to compare against, Toggl
   * has nothing to suggest, so the calendar stays empty.
   */
  onFinish: (profile: Profile | null) => void;
};

const STEPS = 3;

/**
 * Three questions over the calendar.
 *
 * The overlay is deliberately not a full-bleed splash: the week sits visible
 * and empty behind it, so the user can see where they are about to land and
 * — more to the point — sees the empty grid fill the instant Q3 is answered.
 *
 * Q1 and Q2 are the entire reason Toggl can estimate anything on day one, so
 * each question says what it buys rather than just asking.
 */
export default function Onboarding({ onFinish }: Props) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);

  const discipline =
    ONBOARDING.disciplines.find((d) => d.label === profile.discipline) ??
    ONBOARDING.disciplines[0];

  const set = <K extends keyof Profile>(key: K, value: Profile[K]) =>
    setProfile((prev) => ({ ...prev, [key]: value }));

  const next = () => (step === STEPS - 1 ? onFinish(profile) : setStep(step + 1));

  const canContinue =
    step === 0
      ? Boolean(profile.discipline && profile.specialization)
      : step === 1
        ? Boolean(profile.clientType)
        : Boolean(profile.projectName.trim() && profile.clientName.trim());

  return (
    <div className="ob-scrim">
      <div className="ob-card" role="dialog" aria-modal="true" aria-label="Set up Toggl">
        <div className="ob-top">
          {step > 0 ? (
            <button className="ob-back" onClick={() => setStep(step - 1)}>
              <ChevronLeft size={14} />
              Back
            </button>
          ) : (
            <span className="ob-count">Question 1 of {STEPS}</span>
          )}
          {step > 0 && (
            <span className="ob-count">
              Question {step + 1} of {STEPS}
            </span>
          )}
          <div className="spacer" />
          <div className="ob-dots">
            {Array.from({ length: STEPS }, (_, i) => (
              <span key={i} className={`ob-dot${i <= step ? " on" : ""}`} />
            ))}
          </div>
        </div>

        {step === 0 && (
          <>
            <h2 className="ob-title">What kind of work do you do?</h2>
            <p className="ob-sub">
              You have no history yet, so we estimate from freelancers doing the same
              work. This is who we compare you to — until we have enough of your own
              data to stop.
            </p>

            <label className="ob-field">
              <span className="ob-label">Discipline</span>
              <span className="ob-select">
                <select
                  value={profile.discipline}
                  onChange={(e) => {
                    const picked = ONBOARDING.disciplines.find(
                      (d) => d.label === e.target.value,
                    )!;
                    setProfile((prev) => ({
                      ...prev,
                      discipline: picked.label,
                      // Specializations are dependent — reset to the first valid one.
                      specialization: picked.specializations[0],
                    }));
                  }}
                >
                  {ONBOARDING.disciplines.map((d) => (
                    <option key={d.label}>{d.label}</option>
                  ))}
                </select>
                <ChevronDown size={16} />
              </span>
            </label>

            <label className="ob-field">
              <span className="ob-label">Specialization</span>
              <span className="ob-select">
                <select
                  value={profile.specialization}
                  onChange={(e) => set("specialization", e.target.value)}
                >
                  {discipline.specializations.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown size={16} />
              </span>
            </label>
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="ob-title">Who do you usually work for?</h2>
            <p className="ob-sub">
              Client type moves estimates more than most things — an enterprise review
              cycle is not a startup review cycle.
            </p>

            <div className="ob-choices">
              {ONBOARDING.clientTypes.map((type) => (
                <button
                  key={type}
                  className={`ob-choice${profile.clientType === type ? " on" : ""}`}
                  onClick={() => set("clientType", type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="ob-title">What are you starting on?</h2>
            <p className="ob-sub">
              Last one. We will lay the week out for you as soon as you are done.
            </p>

            <label className="ob-field">
              <span className="ob-label">Project name</span>
              <input
                className="ob-input"
                value={profile.projectName}
                onChange={(e) => set("projectName", e.target.value)}
                placeholder="Nordvik Identity"
              />
            </label>

            <label className="ob-field">
              <span className="ob-label">Client</span>
              <input
                className="ob-input"
                value={profile.clientName}
                onChange={(e) => set("clientName", e.target.value)}
                placeholder="Nordvik Coffee"
              />
            </label>

            <label className="ob-field">
              <span className="ob-label">Deadline</span>
              <input
                className="ob-input"
                type="date"
                value={profile.deadline}
                onChange={(e) => set("deadline", e.target.value)}
              />
            </label>
          </>
        )}

        <div className="ob-foot">
          <button className="ob-skip" onClick={() => onFinish(null)}>
            Skip
          </button>
          <div className="spacer" />
          <button className="btn-primary" disabled={!canContinue} onClick={next}>
            {step === STEPS - 1 ? "Plan my week" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
