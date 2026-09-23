import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLogin } from "../hooks/useAuthActions";
import styles from "./LoginForm.module.css";

export function LoginForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const { loginPost } = useLogin();

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // prevent page reload
    const token = await loginPost(name, password);
    login(name, token);
    navigate("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="name">Name: </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="pass">Password: </label>
        <input
          type="password"
          id="pass"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
