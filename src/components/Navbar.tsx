import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css"


export function Navbar() {
    const navigate = useNavigate()
    async function handleLogout() {
        await fetch('http://localhost:3000/users/logout', {method: 'GET', credentials: 'include'})
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