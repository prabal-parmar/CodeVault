import "./App.css";
import "./index.css";
import Generate from "./pages/CodeEditor/Generate";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProtectedRoute from "./auth/ProtectedRoute";
import AllCodes from "./pages/AllCodes/AllCodes";
import { useContext } from "react";
import { DarkModeContext } from "./context/DarkModeProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Roles from "./pages/InterviewPrep/Pages/SelectRoles";
import InterviewPage from "./pages/InterviewPrep/Pages/InterviewPage";
import ShowInterviews from "./pages/InterviewPrep/Pages/ShowInterviews";

function App() {

  const {darkMode} = useContext(DarkModeContext)
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Header />
        <div className="bg-gray-100 dark:bg-slate-900 min-h-screen p-6 transition-colors duration-400">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/generate" element={<Generate />} />
              <Route path="/profile" element={<Profile />} />
              <Route path='/allcodes' element={<AllCodes/>} />
              <Route path='/interview-prep' element={<Roles />} />
              <Route path='/interview-prep/myInterviews' element={<ShowInterviews />} />
              <Route path='/interview-prep/:role' element={<InterviewPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
}

export default App;
