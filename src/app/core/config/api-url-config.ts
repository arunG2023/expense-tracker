import { environment } from "src/environments/environment";

export const apiUrl = {
    LOGIN: environment.baseAPIUrl + "/login",
    REGISTER: environment.baseAPIUrl + "/register-user",
    GET_EXPENSES: environment.baseAPIUrl + "/expense/user",
    GET_ALL_CATEGORIES: environment.baseAPIUrl + "/category",
    GET_ALL_MODE: environment.baseAPIUrl + "/mode",
    ADD_EXPENSE: environment.baseAPIUrl + "/expense/add",
    DELETE_EXPENSE: environment.baseAPIUrl +  "/expense/delete",
    GET_PDF: environment.baseAPIUrl + "/pdf",
    ADD_CATEGORY: environment.baseAPIUrl + "/category/add",
    UPDATE_EXPENSE: environment.baseAPIUrl + "/expense/update",
    GET_USER_PROFILE: environment.baseAPIUrl + "/user",
    UPDATE_USER_DATA: environment.baseAPIUrl + "/user/update"
}