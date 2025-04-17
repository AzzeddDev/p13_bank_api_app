import axios, { AxiosResponse } from "axios"

export async function loginUser(email: string, password: string) {
    const response: AxiosResponse = await axios.post("http://localhost:3001/api/v1/user/login", {
        email,
        password,
    })

    return response.data
}

export async function getUserProfile(token: string) {
    try {
        const response = await fetch("http://localhost:3001/api/v1/user/profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            throw new Error("Failed to fetch profile data")
        }

        return await response.json()
    } catch (error) {
        throw new Error("Failed to fetch profile data: " + (error instanceof Error ? error.message : "Unknown error"))
    }
}