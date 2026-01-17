import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const ExpenseReport = () => {
    const navigate = useNavigate()
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [grandTotal, setGrandTotal] = useState(0);

    const userId = localStorage.getItem('userId');
    useEffect(() => {
        if (!userId) {
            navigate('/login');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://dailyexpense-django.onrender.com/api/search_expense/${userId}/?from=${fromDate}&to=${toDate}`)
            const data = await response.json();
            setExpenses(data.expenses);
            setGrandTotal(data.total);

        }
        catch (error) {
            console.error('Error fetching expenses:', error);
            toast.error('Something went wrong. Try again.')
        }
    };
    return (
        <div className='container mt-4'>
            <div className='text-center mb-3'>
                <h2><i className='fas fa-file-invoice-dollar '></i>Datewise Expense Report</h2>
                <p className='text-muted'>Search and analyze your expenses between two dates</p>
            </div>
            <form className='row g-3' onSubmit={handleSubmit}>
                <div className='col-md-4'>
                    <div className='input-group'>
                        <span className='input-group-text'>
                            <i className='fas fa-calendar-alt'></i>
                        </span>
                        <input type='date' className='form-control' value={fromDate} onChange={(e) => setFromDate(e.target.value)} required name='fromdate' />
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='input-group'>
                        <span className='input-group-text'>
                            <i className='fas fa-calendar-alt'></i>
                        </span>
                        <input type='date' className='form-control' value={toDate} onChange={(e) => setToDate(e.target.value)} required name='todate' />
                    </div>
                </div>
                <div className='col-md-4'>
                    <button type='submit' className='btn btn-primary w-100'><i className='fas fa-search me-1'></i> Search</button>
                </div>
            </form>
            {grandTotal!=0 && (
                <div className='mt-3'>
                    <table class="table table-striped table-bordered">
                        <thead className=''>
                            <tr>
                                <th scope="col">Sr</th>
                                <th scope="col">Date</th>
                                <th scope="col">Itemt</th>
                                <th scope="col">Cost(💲)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.length > 0 ? (
                                expenses.map((exp, index) => (
                                    <tr key={exp.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{exp.ExpenseDate}</td>
                                        <td>{exp.ExpenseItem}</td>
                                        <td>{exp.ExpenseCost}</td>
                                    </tr>
                                ))

                            ) : (
                                <tr>
                                    <td colSpan="5" className='text-center text-muted'><i className='fas fa-exclamation-circle'></i> No Expenses found</td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={3} className='text-end  fw-bold'>GrandTotal:</td>
                                <td className='fw-bold text-success'>₹ {grandTotal}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            )}
            <ToastContainer />
        </div>
    )
}

export default ExpenseReport
