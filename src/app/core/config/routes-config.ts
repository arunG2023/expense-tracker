import { SideBar } from "../interfaces/interface"

export const routesConfig = {
    USER: "user",
    LOGIN: "login",
    HOME: "home",
    REGISTER: "sign-up",
    DASHBOARD: "dashboard",
    ADD_EXPENSE: "add-expense",
    LIST_ALL_EXPENSE: "show-all-expenses"
}


export const sideBarRoutes: SideBar[] = [
    {
        title: "Dashboard",
        path: routesConfig.DASHBOARD,
        isActive: false,
        icon: "../../../../../../assets/icons/dashboard.png"
    },
    {
        title: "Show All Expenses",
        path: routesConfig.LIST_ALL_EXPENSE,
        isActive: false,
        icon: "../../../../../../assets/icons/all-expenses.png"
    },
    {
        title: "Add Expense",
        path: routesConfig.ADD_EXPENSE,
        isActive: false,
        icon: "../../../../../../assets/icons/add-expense.png"
    }
]