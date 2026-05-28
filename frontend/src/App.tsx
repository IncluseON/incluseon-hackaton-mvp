import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import { LoginPage } from "./pages/login-page"
import { DashboardPage } from "./pages/dashboard-page"
import { StudentsPage } from "./features/students/pages/students-page"
import { StudentProfilePage } from "./features/students/pages/student-profile-page"
import "./index.css"
import { ProtectedRoute } from "./routes/protected-route"
import { DashboardLayout } from "./layouts/dashboard-layout"
import { AppointmentsPage } from "./features/appointments.ts/pages/appointments-page"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <DashboardPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <StudentsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/students/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <StudentProfilePage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AppointmentsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}