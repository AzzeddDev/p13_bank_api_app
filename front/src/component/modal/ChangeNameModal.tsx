import { useState } from "react"

export function ChangeNameModal({ onClose, onSave }) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const handleSave = () => {
        onSave({ firstName, lastName })
        onClose()
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
