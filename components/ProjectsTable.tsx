import { projects } from "@/lib/data";
import { Checkbox, Dollar, Folder, Plus, SortArrows, Star } from "./Icons";

type Column = {
  key: string;
  label: string;
  /** Column headers that carry a sort control. */
  sortable?: boolean;
  align?: "right" | "center";
  starred?: boolean;
};

const columns: Column[] = [
  { key: "project", label: "Project", sortable: true },
  { key: "client", label: "Client", sortable: true },
  { key: "billable", label: "Billable", sortable: true, align: "center" },
  { key: "rate", label: "Rate", align: "right" },
  { key: "dates", label: "Dates", sortable: true },
  { key: "timeStatus", label: "Time status" },
  { key: "fixedFee", label: "Fixed fee" },
  { key: "variance", label: "Variance", align: "right" },
  { key: "tags", label: "Tags", starred: true },
];

/**
 * Fixed-layout table, matching the live app: every column but PROJECT has an
 * explicit width, so PROJECT absorbs the remaining space (365px at a 1621px
 * table). Cells are 48px tall with 12px of side padding.
 */
export default function ProjectsTable() {
  return (
    <section className="projects">
      <table className="ptable">
        <colgroup>
          <col style={{ width: 36 }} />
          <col />
          <col style={{ width: 144 }} />
          <col style={{ width: 100 }} />
          <col style={{ width: 140 }} />
          <col style={{ width: 160 }} />
          <col style={{ width: 220 }} />
          <col style={{ width: 100 }} />
          <col style={{ width: 100 }} />
          <col style={{ width: 200 }} />
          <col style={{ width: 56 }} />
        </colgroup>

        <thead>
          <tr>
            <th className="col-check">
              <span className="check">
                <Checkbox />
              </span>
            </th>
            {columns.map((col) => (
              <th key={col.key}>
                <span className={`th-inner${col.align ? ` ${col.align}` : ""}`}>
                  <span>{col.label}</span>
                  {col.sortable && <SortArrows size={12} className="sort" />}
                  {col.starred && <Star size={12} className="sort" />}
                </span>
              </th>
            ))}
            <th />
          </tr>
        </thead>

        <tbody>
          {projects.map((project) => (
            <tr key={project.name}>
              <td className="col-check">
                <span className="check row-check">
                  <Checkbox />
                </span>
              </td>

              <td>
                <span className={`project project-${project.color}`}>
                  <Folder size={12} />
                  <span className="project-name">{project.name}</span>
                </span>
              </td>

              <td className="client">{project.client}</td>

              <td>
                {project.billable && (
                  <span className="th-inner center">
                    <span className="billable-badge">
                      <Dollar size={15} />
                    </span>
                  </span>
                )}
              </td>

              <td>
                {project.rate && (
                  <span className="th-inner right">
                    <span className="rate-value">{project.rate}</span>
                    {project.rateCurrency && (
                      <span className="rate-currency">
                        {project.rateCurrency}
                      </span>
                    )}
                  </span>
                )}
              </td>

              <td>{project.dates}</td>

              <td>
                {project.timeStatus && (
                  <span className="time-status">
                    <span className="time-status-label">
                      {project.timeStatus.label}
                      <span className="dot">•</span>
                      {project.timeStatus.percent}
                    </span>
                    <span className="track">
                      <span
                        className={`track-fill${
                          project.timeStatus.over ? " over" : ""
                        }`}
                        style={{
                          width: `${Math.max(
                            project.timeStatus.fill * 100,
                            0.6,
                          )}%`,
                        }}
                      />
                    </span>
                  </span>
                )}
              </td>

              <td>{project.fixedFee}</td>

              <td>
                {project.variance && (
                  <span className="th-inner right">
                    <span
                      className={`variance${
                        project.variance.positive ? " positive" : " negative"
                      }`}
                    >
                      {project.variance.text}
                    </span>
                  </span>
                )}
              </td>

              <td />
              <td />
            </tr>
          ))}
        </tbody>
      </table>

      <button className="add-project">
        <Plus size={12} />
        Add project
      </button>
    </section>
  );
}
