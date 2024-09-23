import {createContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext({});

function AuthContextProvider ({children}) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            const decoded = jwtDecode(jwt);
            void fetchUserData(decoded.sub, jwt);
        } else {
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, []);

    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    // const [error, toggleError] = useState(false);
    // eslint-disable-next-line no-unused-vars
    // const [loading, toggleLoading] = useState(false);

    function login(jwt) {
        localStorage.setItem('jwt', jwt);
        const decoded = jwtDecode(jwt);
        void fetchUserData(decoded.sub, jwt);
    }

    function logout() {
        localStorage.clear();
        toggleIsAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });
        console.log('Gebruiker is uitgelogd!');
        navigate('/');
    }

    async function fetchUserData(username, jwt) {
        try {
            const result = await axios.get( `http://localhost:1991/users/${username}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            });
            toggleIsAuth( {
                isAuth: true,
                user: {
                    username: result.data.username,
                    // email: result.data.email,
                },
                status: 'done',
            });
        } catch ( e ) {
            console.error( e );
            toggleIsAuth( {
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }

    const contextData = {
        ...isAuth,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;


