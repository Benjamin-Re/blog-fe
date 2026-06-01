export function Greeting () {

    async function handleClick () {
        const res = await fetch('http://localhost:3000')
        const data = await res.json()
        console.log(data)
        
    }

    return (
        <>
            <p>Hello World</p>
            <button onClick={handleClick}>Click</button>
        </>
    )
}