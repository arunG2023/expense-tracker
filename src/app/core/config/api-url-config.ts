import { environment } from "src/environments/environment";

export const apiUrl = {
    LOGIN: environment.baseAPIUrl + "/login",
    REGISTER: environment.baseAPIUrl + "/register-user",
    GET_EXPENSES: environment.baseAPIUrl + "/expense/user",
    GET_ALL_CATEGORIES: environment.baseAPIUrl + "/category",
    GET_ALL_MODE: environment.baseAPIUrl + "/mode",
    ADD_EXPENSE: environment.baseAPIUrl + "/expense/add"
}