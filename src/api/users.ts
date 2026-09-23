import { request } from "./client";

export function loginUser(name: string, password: string) {
    return request<{token: string}>("/users/login", {
        method: "POST",
        body: JSON.stringify({name, password})
    })
}