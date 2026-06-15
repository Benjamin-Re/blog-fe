import { useEffect, useState } from 'react'
import { Greeting } from '../components/Greeting'
import { useNavigate } from 'react-router-dom';

export function HomePage () {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<{ id: number; title: string; content: string }[]>([])

    useEffect(()=>{
        async function getPosts() {
            const raw = await fetch('http://localhost:3000/posts')
            const data = await raw.json()
            return data
        }
        getPosts().then(setPosts)
    }, [])

    function handleEditClick(id: any) {
        console.log('click ' + id)
        navigate(`/posts/edit/${id}`)
    }

    return (
        <>
            <Greeting></Greeting>
            <div>
                { posts.map(m => <div key={m.id}><h3>{m.title}</h3><p>{m.content}</p><button onClick={ () => handleEditClick(m.id)}>edit</button></div>) }
            </div>
        </>
    )
}