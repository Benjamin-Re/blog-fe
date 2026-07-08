import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css"
import { useAuth } from "../context/AuthContext" 


export function Navbar() {
    const { logout, name } = useAuth() 
    const navigate = useNavigate()
    const path = window.location.pathname;

    async function handleLogout() {
        logout()
        navigate('/')
    }

    return (
        <div className={styles.navContainer}>
            <Link to="/" className={ path === '/' ? styles.active : ''}>Home</Link>
            { !name && 
                <>
                    <Link to="/users/login" className={ path === '/users/login' ? styles.active : ''}>Login</Link>
                    <Link to="/users/signup" className={ path === '/users/signup' ? styles.active : ''}>Signup</Link>
                </>
            
            }
            <Link to="/posts/create" className={ path === '/posts/create' ? styles.active : ''}>Create Post</Link>
            { name && <Link to="" onClick={handleLogout}>Logout</Link>}
            
        </div>
    )
}