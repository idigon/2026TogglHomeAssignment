"use client";

import { useState } from "react";
import {
  BarChart,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  Clock,
  Folder,
  Power,
  Tasks,
} from "@/components/Icons";
import { DEFAULT_PROFILE, ONBOARDING, ONBOARDING_INTENTS } from "@/lib/timerData";
import type { Profile } from "@/lib/timerData";

type Props = {
  /**
   * Called with the answers on the last question, and with null on Skip.
   * Skipping is not the same as accepting the defaults: with no cohort to
   * compare against, Toggl has nothing to suggest and the calendar stays empty.
   */
  onFinish: (profile: Profile | null) => void;
};

/** Four screens: Toggl's own intent question, then the three that feed the model. */
const STEPS = 4;

const INTENT_ICONS: Record<string, React.ReactNode> = {
  benchmarking: <BarChart size={18} />,
  time: <Clock size={18} />,
  plan: <Tasks size={18} />,
  projects: <Folder size={18} />,
};

/**
 * Onboarding, built into Toggl's real one.
 *
 * The live product opens by asking what you will mainly use Toggl for and
 * tailors the first experience to the answer. That is exactly the seam this
 * feature belongs in, so rather than bolting a separate overlay onto the
 * calendar, this adds a fourth answer — Smart benchmarking — at the top of
 * that list and continues into the three questions the estimates need.
 *
 * The other three answers stay, and stay selectable, but disable Continue.
 * Leaving them out would have hidden the fact that this is one option among
 * several; greying them out would have hidden what they are.
 */
export default function Onboarding({ onFinish }: Props) {
  const [step, setStep] = useState(0);
  const [intent, setIntent] = useState(ONBOARDING_INTENTS[0].id);
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);

  const discipline =
    ONBOARDING.disciplines.find((d) => d.label === profile.discipline) ??
    ONBOARDING.disciplines[0];
  const chosen = ONBOARDING_INTENTS.find((i) => i.id === intent);

  const set = <K extends keyof Profile>(key: K, value: Profile[K]) =>
    setProfile((prev) => ({ ...prev, [key]: value }));

  const next = () => (step === STEPS - 1 ? onFinish(profile) : setStep(step + 1));

  const canContinue =
    step === 0
      ? Boolean(chosen?.supported)
      : step === 1
        ? Boolean(profile.discipline && profile.specialization)
        : step === 2
          ? Boolean(profile.clientType)
          : Boolean(profile.projectName.trim() && profile.clientName.trim());

  return (
    <div className="ob-page">
      {/* The oversized Toggl marks the real onboarding sits on. */}
      <span className="ob-bg" aria-hidden />

      <div className="ob-card" role="dialog" aria-modal="true" aria-label="Set up Toggl">
        <div className="ob-dots" aria-hidden>
          {Array.from({ length: STEPS }, (_, i) => (
            <span key={i} className={`ob-dot${i <= step ? " on" : ""}`} />
          ))}
        </div>

        <span className="ob-mark" aria-hidden>
          <Power size={26} />
        </span>

        {step === 0 ? (
          <>
            <h1 className="ob-welcome">{ONBOARDING.welcome}</h1>
            <h2 className="ob-title">{ONBOARDING.intentQuestion}</h2>
            <p className="ob-sub">{ONBOARDING.intentSub}</p>

            <div className="ob-intents">
              {ONBOARDING_INTENTS.map((option) => (
                <button
                  key={option.id}
                  className={`ob-intent${intent === option.id ? " on" : ""}`}
                  aria-pressed={intent === option.id}
                  onClick={() => setIntent(option.id)}
                >
                  <span className="ob-intent-icon" aria-hidden>
                    {INTENT_ICONS[option.id]}
                  </span>
                  <span className="ob-intent-text">
                    <span className="ob-intent-title">{option.title}</span>
                    <span className="ob-intent-desc">{option.description}</span>
                  </span>
                  {intent === option.id && (
                    <CheckCircle size={18} className="ob-intent-check" />
                  )}
                </button>
              ))}
            </div>

            {!chosen?.supported && <p className="ob-note">{ONBOARDING.unsupported}</p>}
          </>
        ) : (
          <>
            <button className="ob-back" onClick={() => setStep(step - 1)}>
              <ChevronLeft size={14} />
              Back
            </button>

            {step === 1 && (
              <>
                <h2 className="ob-title">What kind of work do you do?</h2>
                <p className="ob-sub">
                  You have no history yet, so we estimate from freelancers doing the
                  same work. This is who we compare you to — until we have enough of
                  your own data to stop.
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
                          // Dependent — reset to the first valid specialization.
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

            {step === 2 && (
              <>
                <h2 className="ob-title">Who do you usually work for?</h2>
                <p className="ob-sub">
                  Client type moves estimates more than most things — an enterprise
                  review cycle is not a startup review cycle.
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

            {step === 3 && (
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
          </>
        )}

        <div className="ob-foot">
          <button className="ob-skip" onClick={() => onFinish(null)}>
            Skip
          </button>
          <div className="spacer" />
          <button className="btn-primary ob-cta" disabled={!canContinue} onClick={next}>
            {step === STEPS - 1 ? "Plan my week" : "Continue"}
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
