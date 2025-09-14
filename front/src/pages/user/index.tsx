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
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>

            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>

            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">Current Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
        </main>
    )
}
