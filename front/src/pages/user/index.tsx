import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { ChangeNameModal } from "../../component/modal/ChangeNameModal"
import {RootState} from "../../redux/store";
import {fetchUserProfile, updateUserName} from "../../redux/store/userSlice";

export function Dashboard() {
    const dispatch = useDispatch()
    const { profile, loading, error } = useSelector((state: RootState) => state.user)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchUserProfile())
    }, [dispatch])

    const handleNameChange = async (newName: { firstName: string, lastName: string }) => {
        // @ts-ignore
        dispatch(updateUserName(newName))
        setIsModalOpen(false)
    }

    if (loading) return <div><h1>Chargements !...</h1></div>
    if (error) return <div><h1>Erreur: {error}</h1></div>

    return (
        <main className="main bg-dark pad-4">
            <div className="header">
                <h1>
                    Welcome back<br />
                    {profile?.firstName} {profile?.lastName}!
                </h1>
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
