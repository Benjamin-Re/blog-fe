import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/users/signup" element={<SignupPage></SignupPage>} />
          <Route path="/users/login" element={<LoginPage></LoginPage>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
