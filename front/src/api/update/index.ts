export async function updateUserProfile(token: string, firstName: string, lastName: string) {
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstName,
            lastName,
        }),
    })

    if (!response.ok) {
        throw new Error("Failed to update profile")
    }

    return await response.json()
}