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

export interface ErrorData {
    code: string;
    type: string;
    text: string;
    button_text: string;
    icon: {
        light_theme: string;
        dark_theme: string
    }
}

export interface AddExpense {
    name: string;
    amount: string;
    modeId: string;
    categoryId: string;
    date: string
}

export interface DialogBox {
    isShow: boolean;
    text?: string;
    data?: any
}


export interface Modal {
    isAddCategory: boolean;
    isUpdateExepense: boolean;
    data?: any
}

export interface GetPDF {
    type: string;
    data: {
        title: string;
        data: any[]
    }
}

export interface EditExpense {
    name: string;
    amount: string;
    modeId: string;
    categoryId: string;
    date: string;
    expenseId: string;
}