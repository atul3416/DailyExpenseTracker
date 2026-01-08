import React from 'react'
import {useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const userName = localStorage.getItem('userName');
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
      useEffect(()=>{
            if(!userId){
                navigate('/login');
            }
       },[]);
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
