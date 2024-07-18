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