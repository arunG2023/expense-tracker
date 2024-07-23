export const validationLimit = {
    PASSWORD_MIN_LENGTH: 4,
    PASSWORD_MAX_LENGTH: 10,
}

export const validationRegex = {
    NAME_REGEX:  /^[a-zA-Z]+[a-zA-Z ]*$/,
    PHONE_NUMBER_REGEX: /^\d{10}$/,
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

        
    },
    SUCCESS: {

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

    },
    BUTTON: {
        LOGIN: "Login",
        SIGN_UP: "Sign Up"
    }, 

    PLACEHOLDER: {
        ENTER_EMAIL: "Enter Email",
        ENTER_PASSWORD: "Enter Password",
        ENTER_FIRST_NAME: "Enter First Name",
        ENTER_LAST_NAME: "Enter Last Name",
        ENTER_PHONE: "Enter Phone Number",
        ENTER_ADDRESS: "Enter Address",
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