import { useEffect, useState } from 'react'
import { Greeting } from '../components/Greeting'


export function HomePage () {
    const [posts, setPosts] = useState<{ id: number; title: string; content: string }[]>([])

    useEffect(()=>{
        async function getPosts() {
            const raw = await fetch('http://localhost:3000/posts')
            const data = await raw.json()
            return data
        }
        getPosts().then(setPosts)
    }, [])
    return (
        <>
            <Greeting></Greeting>
            <div>
                { posts.map(m => <div key={m.id}><h3>{m.title}</h3><p>{m.content}</p></div>) }
            </div>
        </>
    )
}