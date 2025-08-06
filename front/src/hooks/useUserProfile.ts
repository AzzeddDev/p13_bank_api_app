import { useState, useEffect } from "react"
import { getUserProfile } from "../api/auth"
import {updateUserProfile} from "../api/update"

export function useUserProfile() {
    const [userProfile, setUserProfile] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (!token) {
            setLoading(false)
            setError("No token found")
            return
        }

        const fetchUserProfile = async () => {
            try {
                const profile = await getUserProfile(token)
                setUserProfile(profile.body)
                setLoading(false)
            } catch (error) {
                // @ts-ignore
                setError(error.message || "Error fetching profile data")
                setLoading(false)
            }
        }

        fetchUserProfile()
    }, [])

    const updateProfile = async (firstName: string, lastName: string) => {
        const token = localStorage.getItem("token")
        if (!token) {
            throw new Error("No token found")
        }

        try {
            const updatedProfile = await updateUserProfile(token, firstName, lastName)
            setUserProfile(updatedProfile.body)
        } catch (error) {
            // @ts-ignore
            setError(error.message || "Error updating profile")
        }
    }

    return { userProfile, loading, error, updateProfile }
}