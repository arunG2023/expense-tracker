export interface Login {
    email: string;
    password: string;
}

export interface RegisterUser {
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    phone: number,
    password: string
}


export interface SnackBar {
    message: string;
    type: string;
    time: number;
}


export interface SideBar {
    path: string;
    title: string;
    icon: string;
    isActive: boolean;
}

export interface ExpenseTableData {
    title: string;
    limit: number;
    data: any[];
}
