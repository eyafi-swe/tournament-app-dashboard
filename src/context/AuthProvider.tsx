import React, { ReactNode, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export interface ILoggedToken {
    ul_token: string | null;
}

export interface IUser {
    email: string,
    exp: number,
    iat: number,
    role: string,
    _id: string
}

export const AuthContext = React.createContext<any>({});

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [loginToken, setLoginToken] = useState<ILoggedToken>({ ul_token: null });

    useEffect(() => {
        const ul_token = localStorage.getItem("ul_token");
        if (ul_token) {
            setLoginToken({ ul_token });
        }
        // setLoading(false);
    }, []);

    useEffect(() => {
        const token = loginToken.ul_token;
        console.log({ token });
        if (token) {
            const decodedToken: any = jwtDecode(token);
            // console.log({ decodedToken });
            if (decodedToken.exp * 1000 < Date.now()) {
                localStorage.removeItem('ul_token');
            } else {
                setUser(decodedToken);
            }
        }
        setLoading(false);

    }, [loginToken]);

    useEffect(() => {
        console.log(loading)
    }, [loading])

    return (
        <AuthContext.Provider value={{ user, setUser, loginToken, setLoginToken, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;