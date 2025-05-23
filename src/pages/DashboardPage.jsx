import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardPage() {
    const { user } = useAuth();

    // Initialize states with safe defaults to avoid undefined errors
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [monthlySummary, setMonthlySummary] = useState({}); // empty object
    const [monthlySummaryByCategory, setMonthlySummaryByCategory] = useState({}); // empty object
    const [yearlySummaryByCategory, setYearlySummaryByCategory] = useState({});
    const [recentExpenses, setRecentExpenses] = useState([]); // empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user?.id) return;

        async function fetchDashboardData() {
            try {
                setLoading(true);

                const userId = user.id;

                // Fetch total expenses
                const totalResp = await axios.get(`/api/expenses/user/${userId}/total`);
                setTotalExpenses(totalResp.data || 0);

                // Fetch monthly summary (for current year/month)
                const now = new Date();
                const year = now.getFullYear();
                const month = now.getMonth() + 1; // JS months 0-based

                const monthlySummaryResp = await axios.get(`/api/expenses/user/${userId}/monthly-summary`);
                setMonthlySummary(monthlySummaryResp.data || {});

                const monthlyByCategoryResp = await axios.get(`/api/expenses/user/${userId}/monthly-summary-by-category`, {
                    params: { year, month }
                });
                setMonthlySummaryByCategory(monthlyByCategoryResp.data || {});

                const yearlyByCategoryResp = await axios.get(`/api/expenses/user/${userId}/yearly-summary`, {
                    params: { year }
                });
                setYearlySummaryByCategory(yearlyByCategoryResp.data || {});

                // Fetch recent expenses (first 5)
                const recentResp = await axios.get(`/api/expenses`, {
                    params: { pageNo: 0, pageSize: 5, sortBy: 'date', sortDir: 'desc' }
                });
                setRecentExpenses(recentResp.data?.content || []);

                setLoading(false);
                setError(null);
            } catch (err) {
                setError('Failed to load dashboard data.');
                setLoading(false);
            }
        }

        fetchDashboardData();
    }, [user]);

    return (
        <div>
            <h2>Welcome to your Expense Dashboard, {user?.username || 'User'}!</h2>
            <p>This is where you'll get an overview of your financial activities.</p>
            <p>Use the navigation bar above to:</p>
            <ul>
                <li><strong>View Expenses:</strong> See a list of all your recorded expenses.</li>
                <li><strong>Create Expense:</strong> Add a new expense.</li>
            </ul>

            <h3>Quick Actions:</h3>
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                <a href="/expenses/create" className="btn-primary">Add New Expense</a>
                <a href="/expenses" className="btn-secondary">View All Expenses</a>
            </div>

            <hr style={{ marginTop: '30px', marginBottom: '20px' }} />

            {loading && <p>Loading dashboard data...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!loading && !error && (
                <>
                    <h3>Summary</h3>
                    <p>Total Expenses: ₹{Number(totalExpenses).toFixed(2)}</p>

                    <h4>Monthly Summary (Current Year)</h4>
                    {monthlySummary && Object.keys(monthlySummary).length > 0 ? (
                        <ul>
                            {Object.entries(monthlySummary).map(([month, amount]) => (
                                <li key={month}>{month}: ₹{Number(amount).toFixed(2)}</li>
                            ))}
                        </ul>
                    ) : <p>No monthly summary data.</p>}

                    <h4>Monthly Summary By Category (Current Month)</h4>
                    {monthlySummaryByCategory && Object.keys(monthlySummaryByCategory).length > 0 ? (
                        <>
                            <ul>
                                {Object.entries(monthlySummaryByCategory).map(([category, amount]) => (
                                    <li key={category}>{category}: ₹{Number(amount).toFixed(2)}</li>
                                ))}
                            </ul>

                            <Pie
                                data={{
                                    labels: Object.keys(monthlySummaryByCategory),
                                    datasets: [{
                                        label: 'Expenses by Category',
                                        data: Object.values(monthlySummaryByCategory),
                                        backgroundColor: [
                                            '#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff', '#ff9f40',
                                            '#66bb6a', '#ef5350', '#29b6f6', '#ab47bc'
                                        ]
                                    }]
                                }}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: { position: 'right' }
                                    }
                                }}
                                style={{ maxWidth: '600px', margin: '0 auto' }}
                            />
                        </>
                    ) : <p>No data available.</p>}

                    <h3>Recent Expenses</h3>
                    {Array.isArray(recentExpenses) && recentExpenses.length > 0 ? (
                        <table border="1" cellPadding="10" style={{ width: '100%', backgroundColor: '#f9f9f9' }}>
                            <thead>
                            <tr>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Category</th>
                                <th>Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {recentExpenses.map(expense => (
                                <tr key={expense.id}>
                                    <td>{expense.description}</td>
                                    <td>₹{Number(expense.amount).toFixed(2)}</td>
                                    <td>{expense.category?.name || 'N/A'}</td>
                                    <td>{new Date(expense.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : <p>No recent expenses found.</p>}
                </>
            )}
        </div>
    );
}

export default DashboardPage;
