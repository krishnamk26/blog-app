import React from 'react'

function CheckBox({ id, status,onStatusChange }) {
    return <>
        <label class="switch">
            <input type="checkbox" checked={status} onChange={()=>onStatusChange(id,!status)}/>
            <span class="slider round"></span>
        </label>
    </>
}

export default CheckBox