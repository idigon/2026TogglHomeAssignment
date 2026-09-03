import { chartMaxMinutes, chartTicks, days } from "@/lib/data";

function formatMinutes(min: number) {
  if (min === 0) return "0h";
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export default function BillableChart() {
  return (
    <section className="card chart-card">
      <h2 className="section-title">Billable vs non-billable time</h2>

      <div className="chart">
        <div className="y-axis">
          {chartTicks.map((tick) => (
            <span key={tick}>{tick}</span>
          ))}
        </div>

        <div className="plot">
          {chartTicks.map((tick, i) => (
            <div
              key={tick}
              className={`gridline${i === chartTicks.length - 1 ? " baseline" : ""}`}
              style={{ top: `${(i / (chartTicks.length - 1)) * 100}%` }}
            />
          ))}

          <div className="bars">
            {days.map((day) => {
              const pct = (day.billableMinutes / chartMaxMinutes) * 100;
              return (
                <div className="bar-col" key={day.label}>
                  <span
                    className={`bar-value${day.billableMinutes === 0 ? " zero" : ""}`}
                  >
                    {formatMinutes(day.billableMinutes)}
                  </span>
                  <div className="bar" style={{ height: `${pct}%` }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="x-axis">
        {days.map((day) => (
          <div key={day.label}>
            <div>{day.label}</div>
            <div className="date">{day.date}</div>
          </div>
        ))}
      </div>

      <div className="legend">
        <span className="swatch" />
        <span>Billable</span>
      </div>
    </section>
  );
}
