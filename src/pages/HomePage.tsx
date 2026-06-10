import { useEffect, useState } from 'react'
import { Greeting } from '../components/Greeting'


export function HomePage () {
    const [messages, setMessages] = useState<{ id: number; title: string; content: string }[]>([])

    useEffect(()=>{
        async function getMessages() {
            const raw = await fetch('http://localhost:3000/messages')
            const data = await raw.json()
            return data
        }
        getMessages().then(setMessages)
    }, [])
    return (
        <>
            <Greeting></Greeting>
            <div>
                { messages.map(m => <div key={m.id}><h3>{m.title}</h3><p>{m.content}</p></div>) }
            </div>
        </>
    )
}