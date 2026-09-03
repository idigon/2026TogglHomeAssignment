import BillableChart from "@/components/BillableChart";
import BreakdownTable from "@/components/BreakdownTable";
import Sidebar from "@/components/Sidebar";
import {
  BarChart,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Globe,
  Plus,
  Settings,
} from "@/components/Icons";
import { summary, week } from "@/lib/data";

export const metadata = {
  title: "Toggl 2.0 - Reports - Summary",
};

export default function ReportsPage() {
  return (
    <div className="app">
      <Sidebar active="reports" />

      <main className="main main-padded">
        <header className="page-head">
          <h1 className="page-title">Reports</h1>
          <button className="control ghost">
            <Download />
            Export
            <ChevronDown />
          </button>
        </header>

        <div className="toolbar">
          <button className="control">
            <BarChart size={14} />
            Summary
            <ChevronDown />
          </button>

          <div className="date-group">
            <button className="arrow" aria-label="Previous week">
              <ChevronLeft size={15} />
            </button>
            <span className="date-label">
              <Calendar />
              {week.label}
              <span className="muted">• {week.code}</span>
            </span>
            <button className="arrow" aria-label="Next week">
              <ChevronRight size={15} />
            </button>
          </div>

          <button className="control">
            <Filter />
            Filters
          </button>

          <div className="spacer" />

          <button className="control">
            <Globe />
            Shown in USD
            <ChevronDown />
          </button>
          <button className="icon-btn" aria-label="Report settings">
            <Settings />
          </button>
        </div>

        <button className="filter-add">
          <Plus />
          Filter
        </button>

        <section className="card">
          <div className="stats">
            <div className="stat">
              <div className="stat-label">Logged time</div>
              <div className="stat-value">{summary.loggedTime}</div>
            </div>
            <div className="stat">
              <div className="stat-label">Billable time</div>
              <div className="stat-value">
                {summary.billableTime}{" "}
                <span className="pct">({summary.billablePercent})</span>
              </div>
            </div>
            <div className="stat">
              <div className="stat-label">Amount</div>
              <div className="stat-value">
                {summary.amount} <span className="unit">{summary.currency}</span>
              </div>
            </div>
            <div className="stat">
              <div className="stat-label">Average daily hours</div>
              <div className="stat-value">{summary.averageDailyHours}</div>
            </div>
          </div>
        </section>

        <BillableChart />
        <BreakdownTable />
      </main>
    </div>
  );
}
