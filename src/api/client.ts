// Fetch wrapper
type RequestOptions = {
    method: "GET" | "POST";
    body?: unknown;
    token?: string | null;
}

export async function request<T>(
    path: string,
    options: RequestOptions,
): Promise<T> {
    const { method = "GET", body, token } = options;
    const headers: Record<string, string> = {}
    if (body !== undefined) {headers["Content-Type"] = "application/json"}
    if (token) headers.Authorization = `Bearer ${token}`;
    console.log(import.meta.env.VITE_API_BASE_URL)
    let res: Response;
    try {
        res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${path}`, {
            method,
            headers,
            body: body === undefined ? undefined : JSON.stringify(body),
        })
        if(!res.ok) throw new Error(`${method} ${path} failed: ${res.status}`)
    } catch (error: any) {
        throw error
    }
    return res.json() 
}

