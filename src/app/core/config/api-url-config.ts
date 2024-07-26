import { environment } from "src/environments/environment";

export const apiUrl = {
    LOGIN: environment.baseAPIUrl + "/login",
    REGISTER: environment.baseAPIUrl + "/register-user",
    GET_EXPENSES: environment.baseAPIUrl + "/exspense/user"
}