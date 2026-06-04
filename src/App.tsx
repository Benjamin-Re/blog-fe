import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage></HomePage>} />
        <Route path="/users/signup" element={<SignupPage></SignupPage>} />
        <Route path="/users/login" element={<LoginPage></LoginPage>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
