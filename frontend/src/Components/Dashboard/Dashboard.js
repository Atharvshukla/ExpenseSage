import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
    const {totalExpenses,incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    return (
        <DashboardStyled>
        <InnerLayout>
            <h1>All Transactions</h1>
            <div className="stats-con">
                <div className="chart-con">
                    <Chart />
                </div>
                <div className="amount-con">
                    <div className="income">
                        <h2>Total Income</h2>
                        <p>
                            {dollar} {totalIncome()}
                        </p>
                    </div>
                    <div className="expense">
                        <h2>Total Expense</h2>
                        <p>
                            {dollar} {totalExpenses()}
                        </p>
                    </div>
                    <div className="balance">
                        <h2>Total Balance</h2>
                        <p>
                            {dollar} {totalBalance()}
                        </p>
                    </div>
                </div>
                <div className="history-con">
                    <History />
                    <h2 className="salary-title">Min <span>Salary</span>Max</h2>
                    <div className="salary-item">
                        <p>
                            ${Math.min(...incomes.map(item => item.amount))}
                        </p>
                        <p>
                            ${Math.max(...incomes.map(item => item.amount))}
                        </p>
                    </div>
                    <h2 className="salary-title">Min <span>Expense</span>Max</h2>
                    <div className="salary-item">
                        <p>
                            ${Math.min(...expenses.map(item => item.amount))}
                        </p>
                        <p>
                            ${Math.max(...expenses.map(item => item.amount))}
                        </p>
                    </div>
                </div>
            </div>
        </InnerLayout>
    </DashboardStyled>
    )
}
const DashboardStyled = styled.div`
 background: #1e1e1e; /* Dark background color */
    color: #f0f0f0; /* Light text color */
    min-height: 100vh;
    padding: 2rem;

    .stats-con {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;

        @media (max-width: 1200px) {
            grid-template-columns: 1fr;
        }

        @media (max-width: 768px) {
            grid-template-columns: 1fr;
        }

        @media (max-width: 480px) {
            grid-template-columns: 1fr;
            gap: 1rem;
        }

        .chart-con {
            grid-column: 1 / 2;
            overflow: hidden; /* Prevent overflowing */
            height: 400px; /* Adjust height */
            background: #2a2a2a; /* Darker background for the chart */
            border-radius: 20px;
            padding: 1rem;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

            @media (max-width: 1200px) {
                grid-column: 1 / -1;
            }

            @media (max-width: 768px) {
                grid-column: 1 / -1;
                display: flex;
                flex-direction: column;
                align-items: flex-start; /* Align to the left */
                width: 100%; /* Make sure it fits within the container */
                height: auto; /* Adjust height automatically */
            }

            @media (max-width: 480px) {
                grid-column: 1 / -1;
                height: auto; /* Ensure height fits the content */
            }

            canvas {
                width: 100% !important; /* Make the chart take full width */
                height: auto !important; /* Adjust height automatically */
            }
        }

        .amount-con {
            grid-column: 1 / 2;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            margin-top: 2rem;

            @media (max-width: 1200px) {
                grid-template-columns: 1fr;
            }

            @media (max-width: 768px) {
                grid-template-columns: 1fr;
                margin-top: 1rem;
            }

            @media (max-width: 480px) {
                grid-template-columns: 1fr;
                margin-top: 1rem;
                gap: 1rem;
            }

            .income, .expense, .balance {
                background: #2a2a2a; /* Darker background for the sections */
                border: 2px solid #333; /* Dark border */
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                border-radius: 20px;
                padding: 1rem;
                transition: transform 0.3s ease, box-shadow 0.3s ease;

                &:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
                }

                p {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: #f0f0f0; /* Light text color */

                    @media (max-width: 768px) {
                        font-size: 2rem;
                    }

                    @media (max-width: 480px) {
                        font-size: 1.5rem;
                    }
                }
            }

            .balance {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                grid-column: span 3; /* Span across all columns */

                @media (max-width: 1200px) {
                    grid-column: span 1;
                }

                p {
                    color: #4caf50; /* Green color for balance */
                    opacity: 0.8;
                    font-size: 3rem;

                    @media (max-width: 768px) {
                        font-size: 2.5rem;
                    }

                    @media (max-width: 480px) {
                        font-size: 2rem;
                    }
                }
            }
        }

        .history-con {
            grid-column: 2 / 3;
            background: #2a2a2a; /* Darker background for the history */
            border-radius: 20px;
            padding: 1rem;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

            @media (max-width: 1200px) {
                grid-column: 1 / -1;
            }

            @media (max-width: 768px) {
                grid-column: 1 / -1;
                margin-top: 1rem;
            }

            @media (max-width: 480px) {
                grid-column: 1 / -1;
                margin-top: 1rem;
                gap: 1rem;
            }

            h2 {
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 1.5rem;
                color: #f0f0f0; /* Light text color */

                @media (max-width: 768px) {
                    font-size: 1.2rem;
                }

                @media (max-width: 480px) {
                    font-size: 1rem;
                }
            }

            .salary-title {
                font-size: 1.2rem;
                margin-top: 2rem;
                color: #f0f0f0; /* Light text color */

                span {
                    font-size: 1.8rem;
                    color: #f0f0f0; /* Light text color */

                    @media (max-width: 768px) {
                        font-size: 1.5rem;
                    }

                    @media (max-width: 480px) {
                        font-size: 1.3rem;
                    }
                }
            }

            .salary-item {
                background: #333; /* Dark background for salary items */
                border: 2px solid #444; /* Dark border */
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: transform 0.3s ease, box-shadow 0.3s ease;

                &:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
                }

                p {
                    font-weight: 600;
                    font-size: 1.6rem;

                    @media (max-width: 768px) {
                        font-size: 1.2rem;
                    }

                    @media (max-width: 480px) {
                        font-size: 1rem;
                    }
                }
            }
        }
    }

    h1 {
        font-size: 2.5rem;
        color: #f0f0f0; /* Light text color */
        text-align: center;
        margin-bottom: 2rem;

        @media (max-width: 768px) {
            font-size: 2rem;
        }

        @media (max-width: 480px) {
            font-size: 1.5rem;
        }
    }
`;

export default Dashboard;

