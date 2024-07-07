import {dashboard, expenses, transactions, trend,advise} from '../utils/Icons'

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "View Transactions",
        icon: transactions,
        link: "/dashboard",
    },
    {
        id: 3,
        title: "Incomes",
        icon: trend,
        link: "/dashboard",
    },
    {
        id: 4,
        title: "Expenses",
        icon: expenses,
        link: "/dashboard",
    },
    {
        id: 5,
        title: 'Investment Advice',
        icon: <i className="fas fa-chart-line"></i>,
        external: true,  // Add this property
        link: 'https://expensesage-advise.streamlit.app/'  // Add the external link
      },
      {
        id: 6,
        title: "Register",
        icon: expenses,
        link: "/register",
    },
    {
        id:7,
        title:"Login",
        icon:expenses,
        link:"/login"
    },
      
]