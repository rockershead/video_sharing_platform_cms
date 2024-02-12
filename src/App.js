import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ChannelList from "./pages/ChannelList";

import NewPassword from "./pages/NewPassword";

import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    // Render a loading indicator while isLoading is true
    return <p>Loading...</p>;
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/channels" element={<ChannelList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/NewPassword" element={<NewPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
