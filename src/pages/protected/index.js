import React from 'react'

function Protected() {
    return (
        <div>protected</div>
    )
}

Protected.authGuard = true

export default Protected
