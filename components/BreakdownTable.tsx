import { rows } from "@/lib/data";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Info,
  Plus,
  SortArrows,
} from "./Icons";

type Column = {
  key: string;
  label: string;
  numeric: boolean;
  info: boolean;
  /** PROJECT is the one header with no sort control. */
  plain: boolean;
};

const columns: Column[] = [
  { key: "member", label: "MEMBER | TASK", numeric: false, info: false, plain: false },
  { key: "project", label: "PROJECT", numeric: false, info: false, plain: true },
  { key: "client", label: "CLIENT", numeric: false, info: false, plain: false },
  { key: "logged", label: "LOGGED TIME", numeric: true, info: false, plain: false },
  { key: "estimated", label: "ESTIMATED ...", numeric: true, info: true, plain: false },
  { key: "amount", label: "AMOUNT", numeric: true, info: false, plain: false },
  { key: "cost", label: "COST", numeric: true, info: false, plain: false },
  { key: "billableTime", label: "BILLABLE ...", numeric: true, info: false, plain: false },
  { key: "billablePct", label: "BILLAB...", numeric: true, info: false, plain: false },
];

export default function BreakdownTable() {
  return (
    <section className="card breakdown">
      <div className="breakdown-head">
        <h2 className="section-title" style={{ margin: 0 }}>
          Member and task breakdown
        </h2>
        <div className="breakdown-controls">
          <span className="label">Breakdown by:</span>
          <button className="control">
            Member
            <ChevronDown />
          </button>
          <span className="label">and:</span>
          <button className="control">
            Task
            <ChevronDown />
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={col.numeric ? "num" : undefined}>
                <span className="th-inner">
                  <span>{col.label}</span>
                  {col.info && <Info />}
                  {!col.plain && <SortArrows />}
                </span>
              </th>
            ))}
            <th className="add">
              <button className="icon-btn" style={{ margin: "0 auto" }}>
                <Plus />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.member}>
              <td>
                <span className="expander">
                  <ChevronRight size={13} />
                  <span>
                    {row.member}{" "}
                    <span className="member-count">({row.entryCount})</span>
                  </span>
                </span>
              </td>
              <td>{row.project}</td>
              <td>{row.client}</td>
              <td className="num">{row.loggedTime}</td>
              <td className="num">{row.estimated}</td>
              <td className="num">
                {row.amount}
                <span className="unit-sm">USD</span>
              </td>
              <td className="num">
                <span className="cost-value">{row.cost}</span>
                <span className="unit-sm">USD</span>
              </td>
              <td className="num">{row.billableTime}</td>
              <td className="num">{row.billablePercent}</td>
              <td />
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <div className="page-select">
          <span>1</span>
          <ChevronDown size={13} />
        </div>
        <span className="of">of 1</span>
        <span className="arrow">
          <ChevronLeft size={15} />
        </span>
        <span className="arrow">
          <ChevronRight size={15} />
        </span>
      </div>
    </section>
  );
}
