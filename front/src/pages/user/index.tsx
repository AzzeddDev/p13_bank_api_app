import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { ChangeNameModal } from "../../component/modal/ChangeNameModal"
import {RootState} from "../../redux/store";
import {fetchUserProfile, updateUserName} from "../../redux/store/userSlice";
import AccountSection from "../../component/account-section";

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

    // @ts-ignore
    return (
        <main className="mainUser bg-dark pad-4">
            <div className="header">
                <h1>
                    Welcome back<br/>
                    {profile?.firstName} {profile?.lastName}!
                </h1>
                <button className={"edit-button"} onClick={() => setIsModalOpen(true)}>Edit Name</button>

                <div className={"modalBody"}>
                    {isModalOpen && (
                        <ChangeNameModal
                            onClose={() => setIsModalOpen(false)}
                            onSave={handleNameChange}
                        />
                    )}
                </div>
            </div>

            <h2 className="sr-only">Accounts</h2>

            {/* add in futur loop here */}
            <AccountSection
                title="Argent Bank Checking (x8349)"
                amount="$2,082.79"
                description="Available Balance"
                onViewTransactions={() => console.log("Checking transactions")}
            />

            <AccountSection
                title="Argent Bank Savings (x6712)"
                amount="$10,928.42"
                description="Available Balance"
                onViewTransactions={() => console.log("Checking transactions")}
            />

            <AccountSection
                title="Argent Bank Credit Card (x8349)"
                amount="$184.30"
                description="Current Balance"
                onViewTransactions={() => console.log("Checking transactions")}
            />

        </main>
    )
}
