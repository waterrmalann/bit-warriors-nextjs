export const API_ROUTES = {

    AUTH: {
        GET: "http://localhost:3002/auth",
        REGISTER_POST: "http://localhost:3002/register",
        LOGIN_POST: "http://localhost:3002/login",
        LOGOUT_GET: "http://localhost:3002/logout",
        MFA_POST: "http://localhost:3002/login-mfa",
    },
    VERIFICATION: {
        EMAIL_GET: (verificationCode: string) => `http://localhost:3002/verify/${verificationCode}`,
        PWD_GET: (verificationCode: string, userId: string) => `/api/user/forget/${verificationCode}?uid=${userId}`
    },
    PROFILE: {
        GET: '/api/user/profile',
        PATCH: '/api/user/profile',
    },
    PREFERENCES: {
        PATCH: '/api/user/prefs'
    },
    DASHBOARD: {
        GET: "/api/user/dashboard"
    }
};