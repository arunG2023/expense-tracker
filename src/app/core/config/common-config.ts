export const validationLimit = {
    PASSWORD_MIN_LENGTH: 4,
    PASSWORD_MAX_LENGTH: 10,
    STRING_MAX_LENGTH: 20,
    LIST_ALL_EXPENSE_ROW_LIMIT: 15,
}

export const validationRegex = {
    NAME_REGEX:  /^[a-zA-Z]+[a-zA-Z ]*$/,
    PHONE_NUMBER_REGEX: /^\d{10}$/,
    AMOUNT_REGEX: /^\d+(\.\d{1,2})?$/
}


export const messages = {
    ERROR: {
        FILL_ALL: "Please fill all the fields",
        SERVER_ERROR: "Sorry, Something went wrong, Can you please try again later",
        EMAIL_REQUIRED: "Email is required",
        EMAIL_INVALID: "Email is invalid",
        PASSWORD_REQUIRED: "Password is required",
        PASSWORD_MIN_LENGTH: `Password should have minimum ${validationLimit.PASSWORD_MIN_LENGTH} characters`,
        PASSWORD_MAX_LENGTH: `Password should have maximum ${validationLimit.PASSWORD_MAX_LENGTH} characters`,
        PASSWORD_STRENGTH: "Password is not strong enough",
        FIRST_NAME_REQUIRED: "First name is required",
        FIRST_NAME_INVALID: "First name is invalid",
        LAST_NAME_REQUIRED: "Last name is required",
        LAST_NAME_INVALID: "Last name is invalid",
        PHONE_NUMBER_REQUIRED: "Phone number is required",
        PHONE_NUMBER_INVALID: "Phone number is invalid",
        ADDRESS_REQUIRED: "Address is required",
        EXPENSE_REQUIRED: "Expense is required",
        EXPENSE_INVALID: "Expense is invalid",
        AMOUNT_REQUIRED: "Amount is required",
        AMOUNT_INVALID: "Amount is invalid",
        DATE_REQUIRED: "Date is required",
        MODE_REQUIRED: "Mode is required",
        CATEGORY_REQUIRED: "Category is required",
        INVALID_FIELD: (field: string) => `${field} is invalid` 
    },
    SUCCESS: {
        CATEGORY_ADDED: "Category added successfully",
        LOGGED_OUT: "Logged out successfully",
        
    }
}

export const htmlLabel = {
    TEXT: {
        LOGIN_FORM_HEADER: "User Login",
        NO_ACCOUNT: "Don't have an account?",
        REGISTER_FORM_HEADER: "Create User",
        ACOOUNT_ALREADY_PRESENT: "Already have an account",
        APPLICATION_NAME: "Expense Tracker",
        GRAPH_NAME: "Expense Overview",
        PIE_CHART_NAME: "Expense Split Up",
        CATEGORY: "Category",
        MODE: "Mode",
        ALL_EXPENSES: "All Expenses",
        TOTAL_EXPENSE: "Total Expenese",
        THIS_MONTH: "This month",
        THIS_WEEK: "This week",
        TODAY: "Today",
        EXPENSE: "Expense",
        AMOUNT: "Amount",
        DATE: "Date",
        DELETE_DIALOG_HEADER: "Are you sure?",
        DELETE_DIALOG_QUESTION: "Do you want to delete :",
        ADD_CATEGORY: "Add Category",
        WELCOME: "Welcome",
        PROFILE: "Profile",
        LOG_OUT: "Log Out",
        FIRST_NAME: "First Name",
        LAST_NAME: "Last Name",
        ADDRESS: "Address",
        PHONE: "Phone"
    },
    BUTTON: {
        LOGIN: "Login",
        SIGN_UP: "Sign Up",
        YES: "Yes",
        NO: "No",
        ADD_CATEGORY: "Add Category",
        CANCEL: "Cancel",
        EDIT_EXPENSE: "Update",
        UPDATE: "Update",
        EDIT: "Edit"
    }, 

    PLACEHOLDER: {
        ENTER_EMAIL: "Enter Email",
        ENTER_PASSWORD: "Enter Password",
        ENTER_FIRST_NAME: "Enter First Name",
        ENTER_LAST_NAME: "Enter Last Name",
        ENTER_PHONE: "Enter Phone Number",
        ENTER_ADDRESS: "Enter Address",
        ENTER_EXPENSE: "Enter Expense",
        ENTER_AMOUNT: "Enter Amount",
        SELECT_MODE: "Select a mode",
        SELECT_CATEGORY: "Select a category",
        ENTER_CATEGORY: "Enter Category"
    },

    TABLE: {
        EXPENSE: "Expense",
        CATEGORY: "Category",
        AMOUNT: "Amount",
        MODE: "Mode",
        ACTION: "Actions",
        DATE: "Date"
    }
}


export const snackBar = {
    TYPE: {
        SUCCESS: "success",
        ERROR: "error"
    },
    TIME: {
        MIN: 2000,
        MAX: 10000
    }
}

export const graphFilter = [
    {
        option: "This Week"
    },
    {
        option: "Last Week"
    }
];


export const chartConfig = {
    TEXT_COLOR: "#acaeb3",
    BAR_COLOR: "#6366f1",
    BAR_LABEL: "Expense",
    X_AXIS: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun"],

}


export const errorPageConfig = {
    INTERNAL_SERVER_ERROR: {
        code: "500",
        type: "OOPS! Internal Server Error",
        text: "Internal Server Error Boo-Boo: Our Bad! The server hiccuped. We're dusting off the code and will have it sorted soon. Please be patient",
        button_text: "Be Patient, Try Again",
        icon: {
            light_theme: "../../../../assets/icons/500-light.png",
            dark_theme: "../../../../assets/icons/500-dark.png"
        }
    },
    PAGE_NOT_FOUND: {
        code: "404",
        type: "OOPS! Page Not Found",
        text: "Oopsie-daisy! The page you requested seems to have taken a vacation. Return to the home page and continue your journey.",
        button_text: "Back to Safety",
        icon: {
            light_theme: "../../../../assets/icons/not-found-light.png",
            dark_theme: "../../../../assets/icons/not-found-dark.png"
        }
    },
    FORBIDDEN: {
        code: "403",
        type: "OOPS! Forbidden",
        text: "This page is more off-limits than Area 51....Only those with super clearance can proceed",
        button_text: "Log In",
        icon: {
            light_theme: "../../../../assets/icons/access-denied-light.png",
            dark_theme: "../../../../assets/icons/access-denied-dark.png"
        }
    }
}


export const fileConfig = {
    FILE_NAME: "ExpenseData.pdf",
    FILE_TITLE: "Expenses"
}