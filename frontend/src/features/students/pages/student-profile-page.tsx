import { useState } from "react";
import { useParams } from "react-router-dom";

import {
  Activity,
  Brain,
  FileText,
  Sparkles,
  BarChart3,
  UserCog,
} from "lucide-react";

import { useStudent } from "../hooks/use-student";

import { StudentHeader } from "../components/student-header";
import { StudentOverview } from "../components/student-overview";
import { AssessmentsPanel } from "../assessments/components/assessments-panel";
import { BehaviorRecordsPanel } from "../behavior/components/behavior-records-panel";
import { StudentTimelinePanel } from "../timeline/components/student-timeline-panel";
import { StudentAnalyticsPanel } from "../analytics/components/student-analytics-panel";
import { AIReportsPanel } from "../reports/components/ai-reports-panel";
import { StudentTeamPanel } from "../team/components/student-team-panel";

type StudentProfileTab =
  | "overview"
  | "behavior"
  | "assessments"
  | "timeline"
  | "analytics"
  | "reports"
  | "team";

export function StudentProfilePage() {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState<StudentProfileTab>("overview");

  const { data: student, isLoading, isError } = useStudent(id || "");

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-blue-100 bg-white p-6 text-sm text-zinc-500">
        Carregando perfil do aluno...
      </div>
    );
  }

  if (isError || !student) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-sm text-red-600">
        Não foi possível carregar o aluno.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <StudentHeader student={student} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
        <aside className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm xl:col-span-1">
          <nav className="space-y-2">
            <StudentProfileNavButton
              active={activeTab === "overview"}
              icon={<Brain size={18} />}
              label="Visão geral"
              onClick={() => setActiveTab("overview")}
            />

            <StudentProfileNavButton
              active={activeTab === "behavior"}
              icon={<Activity size={18} />}
              label="Registros ABA"
              onClick={() => setActiveTab("behavior")}
            />

            <StudentProfileNavButton
              active={activeTab === "assessments"}
              icon={<FileText size={18} />}
              label="Entrevistas e Avaliações"
              onClick={() => setActiveTab("assessments")}
            />

            <StudentProfileNavButton
              active={activeTab === "timeline"}
              icon={<Sparkles size={18} />}
              label="Timeline"
              onClick={() => setActiveTab("timeline")}
            />
            <StudentProfileNavButton
              active={activeTab === "analytics"}
              icon={<BarChart3 size={18} />}
              label="Análise"
              onClick={() => setActiveTab("analytics")}
            />

            <StudentProfileNavButton
              active={activeTab === "reports"}
              icon={<FileText size={18} />}
              label="Relatórios IA"
              onClick={() => setActiveTab("reports")}
            />
            <StudentProfileNavButton
              active={activeTab === "team"}
              icon={<UserCog size={18} />}
              label="Equipe"
              onClick={() => setActiveTab("team")}
            />
          </nav>
        </aside>

        <main className="xl:col-span-3">
          {activeTab === "overview" && <StudentOverview student={student} />}

          {activeTab === "behavior" && (
            <BehaviorRecordsPanel studentId={student.id.toString()} />
          )}

          {activeTab === "assessments" && (
            <AssessmentsPanel studentId={student.id.toString()} />
          )}

          {activeTab === "timeline" && (
            <StudentTimelinePanel studentId={student.id.toString()} />
          )}

          {activeTab === "analytics" && (
            <StudentAnalyticsPanel studentId={student.id.toString()} />
          )}

          {activeTab === "reports" && (
            <AIReportsPanel studentId={student.id.toString()} />
          )}
          {activeTab === "team" && (
            <StudentTeamPanel studentId={student.id.toString()} />
          )}
        </main>
      </div>
    </div>
  );
}

function StudentProfileNavButton({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition",
        active
          ? "bg-blue-600 text-white shadow-sm"
          : "text-zinc-600 hover:bg-blue-50 hover:text-blue-700",
      ].join(" ")}
    >
      {icon}
      {label}
    </button>
  );
}
