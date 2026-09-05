import TimerView from "@/components/timer/TimerView";

/**
 * The whole view, sidebar included, is one client tree: the notification bell
 * lives in the rail but its contents come from the calendar's state.
 */
export default function Page() {
  return <TimerView />;
}
