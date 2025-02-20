import { environment } from "src/environments/environment";

export const apiUrl = {
    LOGIN: environment.baseAPIUrl + "/user/login",
    REGISTER: environment.baseAPIUrl + "/user/register-user",
    GET_EXPENSES: environment.baseAPIUrl + "/expense/user",
    GET_ALL_CATEGORIES: environment.baseAPIUrl + "/category/all",
    GET_ALL_MODE: environment.baseAPIUrl + "/mode/all",
    ADD_EXPENSE: environment.baseAPIUrl + "/expense/add",
    DELETE_EXPENSE: environment.baseAPIUrl +  "/expense/delete",
    GET_PDF: environment.baseAPIUrl + "/expense/pdf",
    ADD_CATEGORY: environment.baseAPIUrl + "/category/add",
    UPDATE_EXPENSE: environment.baseAPIUrl + "/expense/update",
    GET_USER_PROFILE: environment.baseAPIUrl + "/user/data",
    UPDATE_USER_DATA: environment.baseAPIUrl + "/user/update",
    UPLOAD_USER_PROFILE_IMG: environment.baseAPIUrl + "/user/upload-image",
    GET_USER_PROFILE_IMG: environment.baseAPIUrl + "/user/image"
}