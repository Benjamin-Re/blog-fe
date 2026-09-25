import { useState } from "react";
import { useNavigate } from "react-router-dom"
import styles from './SignupForm.module.css'
import { signupUser } from "../api/users"

export function SignupForm() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e: any) => {
      e.preventDefault(); // prevent page reload                                                                                                                                          
      signupUser(name, password)
      navigate('/')
    };


    return (
        <>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label htmlFor="name">Name: </label>
                <input id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="pass">Password: </label>
                <input type="password" id="pass" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}
