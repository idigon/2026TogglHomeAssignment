import OutOfScope from "@/components/OutOfScope";

/**
 * A real route, not a 404, so moving between here and Timer is a client-side
 * transition — which is what lets the planned week survive the round trip.
 */
export default function Page() {
  return <OutOfScope />;
}
