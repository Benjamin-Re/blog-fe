import { useState } from "react";

export function SignupForm() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: any) => {
      e.preventDefault(); // prevent page reload                                                                                                                                          
      await fetch(`http://localhost:3000/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ name: name, password: password })
      })
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="pass">Password: </label>
                <input type="password" id="pass" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}
