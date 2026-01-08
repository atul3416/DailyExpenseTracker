import React from 'react'
import { Link } from 'react-router-dom'
function Homepage() {
    const userId = localStorage.getItem('userId');

    return (
        <div className='container text-center mt-5'>
            <h1> Welcome to <span className='text-primary'>DailyExpense Tracer</span></h1>
            <p className='lead'> Track Your Daily Expenses easily and effeciently </p>

            <div className='mt-4 '>
                {userId ? (
                    <>
                        <Link to="/dashboard" className='btn btn-warning mx-2'><i className='fas fa-tachometer-alt me-1'></i> Go to Dashboard</Link>
                    </>
                ) : (
                    <>
                        <Link to="/signup" className='btn btn-primary mx-2 '><i className='fas fa-user-plus me-1'></i> Signup</Link>
                        <Link to="/login" className='btn btn-success mx-2'><i className='fas fa-sign-in-alt me-1'></i> Login</Link>
                    </>
                )}


            </div>
        </div>

    )
}

export default Homepage
