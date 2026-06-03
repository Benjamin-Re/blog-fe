import { useState, useEffect } from "react"

export function Greeting () {

    const [greeting, setGreeting] = useState('Hello')
    type dataType = {
        greeting: string
    }
    useEffect(() => {
        async function fetchGreeting () {
            const res = await fetch('http://localhost:3000', { credentials: 'include' })
            if(res.ok) {
                const data: dataType = await res.json()
                setGreeting(data.greeting)
            }
        }
        fetchGreeting()
    }, [])

    return (
        <>
            <h1>Hello</h1>
            <h1>{ greeting }</h1>
        </>
    )
}