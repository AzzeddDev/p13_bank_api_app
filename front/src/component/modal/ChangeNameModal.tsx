import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import {RootState} from "../../redux/store"

// @ts-ignore
export function ChangeNameModal({ onClose, onSave }) {
    const profile = useSelector((state: RootState) => state.user.profile)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    useEffect(() => {
        if (profile) {
            setFirstName(profile.firstName)
            setLastName(profile.lastName)
        }
    }, [profile])

    const handleSave = () => {
        onSave({ firstName, lastName })
    }

    return (
        <div className="modal">
            <h2>Change Your Name</h2>
            <label>
                First Name:
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </label>
            <label>
                Last Name:
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </label>
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    )
}
