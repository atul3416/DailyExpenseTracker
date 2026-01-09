import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ManageExpense = () => {
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);
    const userId = localStorage.getItem('userId');
    useEffect(() => {
        if (!userId) {
            navigate('/login');
        }
        fetchExpenses(userId);
    }, []);
    const fetchExpenses = async (userId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/manage_expense/${userId}`)
            const data = await response.json();
            setExpenses(data);
        }
        catch (error) {
            console.error("Error fetching expenses: ", error)
        }
    }
    return (

        <div className='container mt-3'>
            <div className='text-center mb-3'>
                <h2><i className='fas fa-tasks me-2 '></i> Manage Expense</h2>
                <p className='text-muted'>View, edit or delete your expenses </p>

            </div>
            <div>

                <table class="table table-striped table-bordered">
                    <thead className=''>
                        <tr>
                            <th scope="col">Sr</th>
                            <th scope="col">Date</th>
                            <th scope="col">Itemt</th>
                            <th scope="col">Cost(💲)</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.length > 0 ? (
                            expenses.map((exp,index)=>(
                                <tr>
                                <th scope="row">{index+1}</th>
                                <td>{exp.ExpenseDate}</td>
                                <td>{exp.ExpenseItem}</td>
                                <td>{exp.ExpenseCost}</td>
                                <td>
                                    <button className='btn btn-sm btn-info me-2'><i className='fas fa-edit'></i> </button>
                                    <button className='btn btn-sm btn-danger'><i className='fas fa-trash-alt'></i> </button>
                                </td>
                            </tr>
                            ))
                            
                        ) : (
                            <tr>
                                <td colSpan="5" className='text-center text-muted'><i className='fas fa-exclamation-circle'></i> No Expenses found</td>
                            </tr>
                        )}



                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ManageExpense
