import { redirect } from "next/navigation";

/**
 * The prototype is the calendar and nothing else. The live app serves this view
 * at /calendar, so that is the canonical route here too; the root just forwards.
 */
export default function Page() {
  redirect("/calendar");
}
