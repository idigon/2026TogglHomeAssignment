"use client";

import { useRouter } from "next/navigation";
import Onboarding from "@/components/timer/Onboarding";
import { beginSession } from "@/components/timer/session";
import type { Profile } from "@/lib/timerData";

/**
 * Toggl runs onboarding on its own route, before the app shell. So does this:
 * the questions are not an overlay on the calendar, they are the thing that
 * decides what the calendar will contain.
 */
export default function Page() {
  const router = useRouter();

  return (
    <Onboarding
      onFinish={(profile: Profile | null) => {
        beginSession(profile);
        router.push("/calendar");
      }}
    />
  );
}
