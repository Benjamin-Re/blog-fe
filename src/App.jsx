import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {LoginPage} from "./pages/LoginPage";
import {SignupPage} from "./pages/SignupPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>} />
        <Route path="/users/signup" element={<SignupPage></SignupPage>} />
        <Route path="/users/login" element={<LoginPage></LoginPage>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
