import ProjectsTable from "@/components/ProjectsTable";
import Sidebar from "@/components/Sidebar";
import {
  ChevronDown,
  Filter,
  GroupBy,
  Star,
  Templates,
  ListView,
  Plus,
  Search,
  Settings,
  SortBy,
} from "@/components/Icons";

export default function Page() {
  return (
    <div className="app">
      <Sidebar active="projects" />

      <main className="main">
        <header className="page-head">
          <h1 className="page-title">Projects</h1>
          <button className="btn-primary">
            <Plus size={16} />
            New project
          </button>
        </header>

        <div className="toolbar">
          <button className="control">
            <ListView />
            Active
            <ChevronDown />
          </button>
          <button className="control is-active">
            <Filter />
            Filters
          </button>
          <button className="control">
            <GroupBy />
            Group by
          </button>
          <button className="control">
            <SortBy />
            Sort by
          </button>

          <div className="spacer" />

          <button className="icon-btn" aria-label="Search">
            <Search />
          </button>
          <button className="icon-btn templates-btn" aria-label="Manage project templates">
            <Templates />
            <Star size={11} className="star-badge" />
          </button>
          <button className="icon-btn" aria-label="Project settings">
            <Settings />
          </button>
        </div>

        <div className="filter-row">
          <button className="filter-add">
            <Plus />
            Filter
          </button>
        </div>

        <ProjectsTable />
      </main>
    </div>
  );
}
