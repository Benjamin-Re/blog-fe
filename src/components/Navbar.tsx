import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css"
import { useAuth } from "../context/AuthContext" 


export function Navbar() {
    const { logout } = useAuth() 
    const navigate = useNavigate()
    
    async function handleLogout() {
        logout()
        navigate('/')
    }

    return (
        <div className={styles.navContainer}>
            <Link to="/">Home</Link>
            <Link to="/users/login">Login</Link>
            <Link to="/users/signup">Signup</Link>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}