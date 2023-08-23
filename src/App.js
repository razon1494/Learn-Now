import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import useAuthCheck from "./hooks/useAuthCheck";

import PublicRoute from "./components/PublicRoute";
import "./style/output.css";
import StudentLogin from "./pages/StudentLogin";
import Dashboard from "./pages/Dashboard";
import Videoes from "./pages/Videoes";
import QuizzesAdmin from "./pages/QuizzesAdmin";
import AssignmentMark from "./pages/AssignmentMark";
import AddVideo from "./pages/AddVideo";
import EditVideo from "./pages/EditVideo";
import Assignments from "./pages/Assignments";
import AddAssignment from "./pages/AddAssignment";
import EditAssignment from "./pages/EditAssignment";
import EditQuiz from "./pages/EditQuiz";
import AddQuiz from "./pages/AddQuiz";
import CoursePlayer from "./pages/CoursePlayer";
import Quiz from "./pages/Quiz";
import PrivateRoute from "./components/PrivateRoute";
import StudentRoute from "./components/StudentRoute";
import AdminRoute from "./components/AdminRoute";
import LeaderBoard from "./pages/LeaderBoard";

function App() {
  const authChecked = useAuthCheck();
  return authChecked ? (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <StudentLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/admin/login"
          element={
            <PublicRoute>
              <StudentLogin />
            </PublicRoute>
          }
        />
        {/* Student Routes */}
        <Route
          path="/leaderboard"
          element={
            <StudentRoute>
              <LeaderBoard />
            </StudentRoute>
          }
        />
        <Route
          path="/courseplayer"
          element={
            <StudentRoute>
              <CoursePlayer />
            </StudentRoute>
          }
        />
        <Route
          path="/courseplayer/:videoId"
          element={
            <StudentRoute>
              <CoursePlayer />
            </StudentRoute>
          }
        />
        <Route
          path="/quiz/:videoId"
          element={
            <StudentRoute>
              <Quiz />
            </StudentRoute>
          }
        />
        {/* Admin Routes Here */}

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/videos"
          element={
            <AdminRoute>
              <Videoes />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/addvideo"
          element={
            <AdminRoute>
              <AddVideo />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/edit/:videoId"
          element={
            <AdminRoute>
              <EditVideo />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/assignment/edit/:assignmentId"
          element={
            <AdminRoute>
              <EditAssignment />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/addquiz"
          element={
            <AdminRoute>
              <AddQuiz />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/quiz/edit/:quizId"
          element={
            <AdminRoute>
              <EditQuiz />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/assignment"
          element={
            <AdminRoute>
              <Assignments />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/assignmentadd"
          element={
            <AdminRoute>
              <AddAssignment />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/quizzes"
          element={
            <AdminRoute>
              <QuizzesAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/marks"
          element={
            <AdminRoute>
              <AssignmentMark />
            </AdminRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
      </Routes>
    </Router>
  ) : (
    <p>Checking Authentication................</p>
  );
}
export default App;
