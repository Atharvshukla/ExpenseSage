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
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                border-radius: 20px;
                margin-bottom:500px;
                padding: 1rem;
                transition: transform 0.3s ease, box-shadow 0.3s ease;

                &:hover {
                    transform: translateY(-5px);
                    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
                }

                p {
                    font-size: 2.5rem;
                    font-weight: 700;

                    @media (max-width: 768px) {
                        font-size: 2rem;
                    }

                    @media (max-width: 480px) {
                        font-size: 1.5rem;
                    }
                }
            }

            .income, .expense, .balance {
                grid-column: span 1;

                @media (max-width: 768px) {
                    grid-column: span 1;
                    margin-bottom:2rem;
                }
            }

            .balance {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-bottom:500px;

                @media (max-width: 768px) {
                    grid-column: span 1;
                }

                p {
                    color: var(--color-green);
                    opacity: 0.6;
                    font-size: 3rem;

                    @media (max-width: 768px) {
                        font-size: 2.5rem;
                    }

                    @media (max-width: 480px) {
                        font-size: 2rem;
                        margin-bottom:0.1rem;
                    }
                }
            }
        }

        .history-con {
            grid-column: 2 / 3;

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
                color: #333;

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
                color: #555;

                span {
                    font-size: 1.8rem;
                    color: #333;

                    @media (max-width: 768px) {
                        font-size: 1.5rem;
                    }

                    @media (max-width: 480px) {
                        font-size: 1.3rem;
                    }
                }
            }

            .salary-item {
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: transform 0.3s ease, box-shadow 0.3s ease;

                &:hover {
                    transform: translateY(-5px);
                    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
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
        color: #333;
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

