import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import cookie from "cookie";
import Home from "./components/Home";
import "./App.css";
import AddPlayer from "./components/AddPlayer";
import Navbar from "./components/Navbar";
import Login from "./components/login";

export const checkAuth = () => {
  const cookies = cookie.parse(document.cookie);
  return cookies["loggedIn"] ? true : false;
};

function App() {
  const ProtectedRoutes = () => {
    return checkAuth() ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/AddPlayer" element={<AddPlayer />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
