export const API_ROUTES = {

    AUTH: {
        GET: "http://localhost:3001/api/user/auth",
        REGISTER_POST: "http://localhost:3001/api/user/register",
        REGISTER_GITHUB_POST: "http://localhost:3001/api/user/oauth-github",
        REGISTER_GOOGLE_POST: "http://localhost:3001/api/user/oauth-google",
        LOGIN_POST: "http://localhost:3001/api/user/login",
        LOGOUT_GET: "http://localhost:3001/api/user/logout",
        MFA_POST: "http://localhost:3001/api/user/login-mfa",
    },
    VERIFICATION: {
        EMAIL_GET: (verificationCode: string) => `http://localhost:3001/api/user/verify/${verificationCode}`,
        PWD_GET: (verificationCode: string, userId: string) => `/api/user/forget/${verificationCode}?uid=${userId}`
    },
    PROBLEMS: {
        GET: "http://localhost:3001/api/problem?limit=10",
        PROBLEM_GET: (problemId: string) => `http://localhost:3001/api/problem/${problemId}`,
        RANDOM_GET: "http://localhost:3001/api/problem/random",
        RUN_POST: (problemId: string) => `http://localhost:3001/api/submission/runs/${problemId}`,
        SUBMIT_POST: (problemId: string) => `http://localhost:3001/api/submission/submit/${problemId}`,
    },
    PROFILE: {
        GET: (username: string) => `http://localhost:3001/api/user/users/${username}`,
        PUT: (username: string) => `http://localhost:3001/api/user/users/${username}`,
        PASSWORD_PUT: (username: string) => `http://localhost:3001/api/user/users/${username}/password`
    },
    PREFERENCES: {
        PATCH: '/api/user/prefs'
    },
    DASHBOARD: {
        GET: "/api/user/dashboard"
    }
};