import { useState } from "react"
import { useUserProfile } from "../../hooks/useUserProfile"
import { ChangeNameModal } from "../../component/modal/ChangeNameModal"

export function Dashboard() {
    const { userProfile, loading, error, updateProfile } = useUserProfile()
    const [isModalOpen, setIsModalOpen] = useState(false)

    if (loading) return <div><h1>Chargements !...</h1></div>
    if (error) return <div><h1>Erreur: {error}</h1></div>

    const handleNameChange = async (newName: { firstName: string, lastName: string }) => {
        try {
            await updateProfile(newName.firstName, newName.lastName)
            setIsModalOpen(false)
        } catch (error) {
            console.error("Error updating profile:", error)
        }
    }

    return (
        <main className="main bg-dark pad-4">
            <div className="header">
                <h1>Welcome back<br />{userProfile.firstName} {userProfile.lastName}!</h1>
                <button onClick={() => setIsModalOpen(true)}>Change Name</button>

                {isModalOpen && (
                    <ChangeNameModal
                        onClose={() => setIsModalOpen(false)}
                        onSave={handleNameChange}
                    />
                )}
            </div>
        </main>
    )
}
