import { SideBar } from "../interfaces/interface"

export const routesConfig = {
    USER: "user",
    LOGIN: "login",
    HOME: "home",
    REGISTER: "sign-up"
}


export const sideBarRoutes: SideBar[] = [
    {
        title: "Dashboard",
        path: "",
        isActive: true,
        icon: "../../../../../../assets/icons/dashboard.png"
    },
    {
        title: "Show All Expenses",
        path: "",
        isActive: false,
        icon: "../../../../../../assets/icons/all-expenses.png"
    },
    {
        title: "Add Expense",
        path: "",
        isActive: false,
        icon: "../../../../../../assets/icons/add-expense.png"
    }
]