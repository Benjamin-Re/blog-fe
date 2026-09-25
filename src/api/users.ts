import { request } from "./client";

export function loginUser(name: string, password: string) {
    return request<{token: string}>("/users/login", {
        method: "POST",
        body: {name, password}
    })
}

export function signupUser(name: string, password: string) {
    request<void>("/users/signup", {
        method: "POST",
        body: { name, password}
    })
}