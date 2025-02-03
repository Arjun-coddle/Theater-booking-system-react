import React, { createContext, useEffect, useReducer, useState, ReactNode, Dispatch } from "react";

interface UserState {
    user: string | null;
}

interface SecureAction {
    type: "LOGIN" | "LOGOUT";
    payload?: string;
}

const SecureRoute = createContext<{
    state: UserState;
    dispatch: Dispatch<SecureAction>;
} | null>(null);

const secureReducer = (state: UserState, action: SecureAction): UserState => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload || null };
        case "LOGOUT":
            return { user: null };
        default:
            return state;
    }
};

interface SecureRouteProviderProps {
    children: ReactNode;
}

const SecureRouteProvider: React.FC<SecureRouteProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(secureReducer, { user: null });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem("token");
        if (user) {
            dispatch({ type: "LOGIN", payload: user });
        }
        setLoading(false);
    }, []);

    if (loading) return null;

    return (
        <SecureRoute.Provider value={{ state, dispatch }}>
            {children}
        </SecureRoute.Provider>
    );
};

export { SecureRoute, SecureRouteProvider };
