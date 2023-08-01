/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { useAuth } from "./context/AuthContext";

function App() {
  const { currentUser } = useAuth();

  function ProtectedRoute({ children }) {
    if (!currentUser) {
      return <Navigate to="/login" replace />;
    } else {
      return children;
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
