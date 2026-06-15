import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { CreatePostPage } from "./pages/CreatePostPage"
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { EditPostForm } from "./components/EditPostForm"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/users/signup" element={<SignupPage></SignupPage>} />
          <Route path="/users/login" element={<LoginPage></LoginPage>} />
          <Route path="/posts/create" element={<CreatePostPage></CreatePostPage>} />
          <Route path="/posts/edit/:id" element={<EditPostForm></EditPostForm>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
