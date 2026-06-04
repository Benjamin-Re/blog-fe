import { Link } from "react-router-dom";
import styles from "./Navbar.module.css"

export function Navbar() {
    return (
        <div className={styles.navContainer}>
            <Link to="/">Home</Link>
            <Link to="/users/login">Login</Link>
            <Link to="/users/signup">Signup</Link>
        </div>
    )
}