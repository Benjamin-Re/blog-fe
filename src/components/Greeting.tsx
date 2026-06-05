import { useAuth } from "../context/AuthContext" 

export function Greeting () {

    const { name } = useAuth()

    return (
        <>
            <h1>{ name ? `Hello ${name}`: 'Hello' }</h1>
        </>
    )
}