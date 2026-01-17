import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'

Chart.register(ArcElement, Tooltip, Legend);
function Dashboard() {


    const userName = localStorage.getItem('userName');
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    const [expenses, setExpenses] = useState([]);
    const [todayTotal, setTodalTotal] = useState(0);
    const [yestardayTotal, setYestardayTotal] = useState(0);
    const [last7daysTotal, setLast7daysTotal] = useState(0);
    const [last30daysTotal, setLast30daysTotal] = useState(0);
    const [currentyearTotal, setCurrentYearTotal] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);

    const pieData = {
        labels: expenses.map(exp => exp.ExpenseItem),
        datasets: [
            {
                label: 'Expense Cost',
                data: expenses.map(exp => parseFloat(exp.ExpenseCost)),
                backgroundColor: ['red', 'blue', '#00ff00', 'rgba(80, 10, 45, 0.5)'],
                borderWidth: 1,
            },
        ],
    }

    useEffect(() => {
        if (!userId) {
            navigate('/login');
        }
        fetchExpenses(userId);
    }, []);
    const fetchExpenses = async (userId) => {
        try {
            const response = await fetch(`http://dailyexpense-django.onrender.com/api/manage_expense/${userId}/`);
            const data = await response.json();
            setExpenses(data);
            calculateTotals(data); //
        }
        catch {

        }
    };

    const calculateTotals = (data) => {
        const today = new Date();
        const yesterday = new Date();
        const last7days = new Date();
        const last30days = new Date();
        const currentyear = today.getFullYear();
        yesterday.setDate(today.getDate() - 1);
        last7days.setDate(today.getDate() - 7);
        last30days.setDate(today.getDate() - 30);

        let todaySum = 0, yeserdaySum = 0, last7Sum = 0, last30Sum = 0, yearSum = 0, grandSum = 0;

        data.forEach(item => {
            const expenseDate = new Date(item.ExpenseDate);
            const amount = parseFloat(item.ExpenseCost) || 0;

            if (expenseDate.toDateString() === today.toDateString()) {
                todaySum += amount;
            }
            if (expenseDate.toDateString() === yesterday.toDateString()) {
                yeserdaySum += amount;
            }
            if (expenseDate >= last7days) {
                last7Sum += amount;
            }
            if (expenseDate >= last30days) {
                last30Sum += amount;
            }
            if (expenseDate.getFullYear() === currentyear) {
                yearSum += amount;
            }

            grandSum += amount;
        })
        setTodalTotal(todaySum);
        setYestardayTotal(yeserdaySum);
        setLast7daysTotal(last7Sum);
        setLast30daysTotal(last30Sum);
        setCurrentYearTotal(yearSum);
        setGrandTotal(grandSum);

    };
    return (
        <div className='container mt-4'>
            <div className='text-center'>
                <h2 >Welcome {userName}!</h2>
                <p className='text-muted'>Here's your expense overview </p>
            </div>
            <div className='row g-4'>
                <div className='col-md-4 mb-2  '>
                    <div className='card bg-primary text-white text-center' style={{ height: '150px' }}>
                        <div className='card-body'>
                            <h5 className='card-title'><i className='fas fa-calendar-day'></i> Today's Expense</h5>
                            <p className='card-text fs-4'>₹{todayTotal}</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-4 mb-2 '>
                    <div className='card bg-success text-white text-center' style={{ height: '150px' }}>
                        <div className='card-body'>
                            <h5 className='card-title'><i className='fas fa-calendar'></i> Yesterday's Expense</h5>
                            <p className='card-text fs-4'>₹{yestardayTotal}</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-4 mb-2 '>
                    <div className='card bg-warning text-white text-center' style={{ height: '150px' }}>
                        <div className='card-body'>
                            <h5 className='card-title'><i className='fas fa-calendar-week'></i> Last 7 day's Expense</h5>
                            <p className='card-text fs-4'>₹{last7daysTotal}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mt-4 '>
                <div className='col-md-4 mb-2 '>
                    <div className='card bg-secondary text-white text-center' style={{ height: '150px' }}>
                        <div className='card-body'>
                            <h5 className='card-title'><i className='fas fa-calendar-alt'></i> Last 30 days's Expense</h5>
                            <p className='card-text fs-4'>₹{last30daysTotal}</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-4 mb-2 '>
                    <div className='card bg-danger text-white text-center' style={{ height: '150px' }}>
                        <div className='card-body'>
                            <h5 className='card-title'><i className='fas fa-calendar'></i> Current Year's Expense</h5>
                            <p className='card-text fs-4'>₹{currentyearTotal}</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-4 mb-2 '>
                    <div className='card bg-black text-white text-center' style={{ height: '150px' }}>
                        <div className='card-body'>
                            <h5 className='card-title'><i className='fas fa-wallet'></i> Total Expense</h5>
                            <p className='card-text fs-4'>₹{grandTotal}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div  className='my-5 ' style={{width:'400px',height: '400px', margin: 'auto'}}>
                <h4 className='text-center'>Expene Distribution</h4>
                <Pie data={pieData}/>
            </div>
        </div>
    )
}

export default Dashboard
