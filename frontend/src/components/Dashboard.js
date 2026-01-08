import React from 'react'

function Dashboard() {
    const userName = localStorage.getItem('userName');

    return (
        <div className='container mt-4'>
            <div className='text-center'>
                <h2 >Welcome {userName}!</h2>
                <p className='text-muted'>Here's your expense overview </p>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Dashboard
