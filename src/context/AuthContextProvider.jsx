import {createContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext({});

function AuthContextProvider ({children}) {
    const [isAuth, setIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            try {
                const decoded = jwtDecode(jwt);
                void fetchUserData(decoded.sub, jwt);
            } catch (e) {
                console.error('Error decoding JWT:', e);
                setIsAuth({
                    isAuth: false,
                    user: null,
                    status: 'done',
                });
            }
        } else {
            setIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, []);

    function login(jwt) {
        localStorage.setItem('jwt', jwt);
        try {
            const decoded = jwtDecode(jwt);
            localStorage.setItem('username', decoded.sub);
            fetchUserData(decoded.sub, jwt);
            setIsAuth({
                isAuth: true,
                user: {
                    username: decoded.sub,
                },
                status: 'done',
            });
        } catch (e) {
            console.error('Error decoding JWT on login:', e);
            setIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }

    function logout() {
        localStorage.clear();
        setIsAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });
        console.log('Gebruiker is uitgelogd!');
        navigate('/');
    }

    async function fetchUserData(username, jwt) {
        try {
            const result = await axios.get(`http://localhost:1991/users/${username}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            });
            setIsAuth({
                isAuth: true,
                user: {
                    username: result.data.username,
                    role: result.data.authorities[0].authority,
                },
                status: 'done',
            });
        } catch (e) {
            console.error('Error fetching user data:', e);
            setIsAuth({
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