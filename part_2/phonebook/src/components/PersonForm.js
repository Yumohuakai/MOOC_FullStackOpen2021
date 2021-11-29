import React from 'react'
import Input from './Input'

const PersonForm = ({addPerson, newName, handleNameChange, newPhonenum, handlePhoneNumChange}) => {
    return (
        <form onSubmit={addPerson}>
            <Input label='name: ' value={newName} onChange={handleNameChange} />
            <br/>
            <Input label='number: ' value={newPhonenum} onChange={handlePhoneNumChange} />
            <br/>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm