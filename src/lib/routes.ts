export const API_ROUTES = {

    AUTH: {
        GET: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/auth`,
        REGISTER_POST: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/register`,
        REGISTER_GITHUB_POST: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/oauth-github`,
        REGISTER_GOOGLE_POST: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/oauth-google`,
        LOGIN_POST: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/login`,
        LOGOUT_GET: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/logout`,
        MFA_POST: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/login-mfa`,
    },
    VERIFICATION: {
        EMAIL_GET: (verificationCode: string) => `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/verify/${verificationCode}`,
        PWD_GET: (verificationCode: string, userId: string) => `/api/user/forget/${verificationCode}?uid=${userId}`
    },
    PROBLEMS: {
        GET: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/problem?limit=10`,
        PROBLEM_GET: (problemId: string) => `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/problem/${problemId}`,
        RANDOM_GET: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/problem/random`,
        RUN_POST: (problemId: string) => `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/submission/runs/${problemId}`,
        SUBMIT_POST: (problemId: string) => `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/submission/submissions/${problemId}`,
    },
    LEADERBOARDS: {
        GET: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/submission/leaderboards`,
    },
    SUBMISSION: {
        FEEDBACK_GET: (submissionId: string) => `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/submission/feedbacks/${submissionId}`,
        USER_GET: (userId: string) => `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/submission/submissions/${userId}`,
        USER_PROBLEM_GET: (userId: string, problemId: string) => `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/submission/submissions/${userId}/${problemId}`,
    },
    PROFILE: {
        GET: (username: string) => `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/users/${username}`,
        PUT: (username: string) => `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/users/${username}`,
        PASSWORD_PUT: (username: string) => `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/users/${username}/password`
    },
    PREFERENCES: {
        PATCH: '/api/user/prefs'
    },
    DASHBOARD: {
        GET: `/api/user/dashboard`
    }
};