// import {createContext, useEffect, useState} from 'react';
// import {useNavigate} from 'react-router-dom';
// import axios from 'axios';
// import tokenExpired from "../helpers/tokenExpired.jsx";
// import tokenUsername from "../helpers/tokenUsername.jsx";
//
// export const AuthContext = createContext({});
//
// const AuthContextProvider = ({children}) => {
//     const [isAuth, toggleIsAuth] = useState({
//         isAuth: false,
//         user: null,
//         status: 'pending',
//     });
//
//     useEffect(() => {
//         const jwt = localStorage.getItem('jwt');
//         if (jwt && tokenExpired(jwt)) {
//             const username = tokenUsername(jwt);
//             void login (jwt, username);
//         } else {
//             logout();
//         }
//     }, []);
//
//     const navigate = useNavigate();
//     // eslint-disable-next-line no-unused-vars
//     const [error, toggleError] = useState(false);
//     // eslint-disable-next-line no-unused-vars
//     const [loading, toggleLoading] = useState(false);
//
//     async function authenticate(username, password) {
//         toggleError(false);
//         toggleLoading(true);
//
//         try {
//             const result = await axios.post('http://localhost:1991/login', {
//                 username: username,
//                 password: password
//             });
//             console.log(result.data);
//             localStorage.setItem('jwt', result.data.jwt);
//             navigate('/profile');
//         } catch (e) {
//             console.error(e);
//             toggleError(true);
//         } finally {
//             toggleLoading(false);
//     }
//
//     async function login(jwt, username) {
//             toggleLoading(true);
//             try {
//                 const result = await axios.get(`http://localhost:1991/users/${username}`, {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${jwt}`,
//                     },
//                 });
//                 toggleIsAuth({
//                     isAuth: true,
//                     user: {
//                         username: result.data.username,
//                     },
//                     status: 'done',
//                 });
//                 localStorage.setItem('jwt', jwt);
//             } catch (e) {
//                 console.error(e);
//                 toggleIsAuth({
//                     isAuth: false,
//                     user: null,
//                     status: 'done',
//                 });
//             } finally {
//                 toggleLoading(false);
//             }
//     }
//     }
//
//     // function login(jwt) {
//     //     localStorage.setItem('jwt', jwt);
//     //     const decoded = jwtDecode(token);
//     //     void fetchUserData(decoded.sub, token);
//     // }
//
//     function logout() {
//         localStorage.clear();
//         toggleIsAuth({
//             isAuth: false,
//             user: null,
//             status: 'done',
//         });
//         console.log('Gebruiker is uitgelogd!');
//         navigate('/');
//     }
//
//     // async function fetchUserData(username, token) {
//     //     try {
//     //         const result = await axios.get( `http://localhost:1991/users/${username}`, {
//     //             headers: {
//     //                 "Content-Type": "application/json",
//     //                 Authorization: `Bearer ${token}`,
//     //             },
//     //         });
//     //         toggleIsAuth( {
//     //             isAuth: true,
//     //             user: {
//     //                 username: result.data.username,
//     //                 // email: result.data.email,
//     //             },
//     //             status: 'done',
//     //         });
//     //     } catch ( e ) {
//     //         console.error( e );
//     //         toggleIsAuth( {
//     //             isAuth: false,
//     //             user: null,
//     //             status: 'done',
//     //         });
//     //     }
//     // }
//
//     const contextData = {
//         ...isAuth,
//         authenticate,
//         login,
//         logout,
//     };
//
//     return (
//         <AuthContext.Provider value={{contextData}}>
//             {isAuth.status === 'done' ? children : <p>Loading...</p>}
//         </AuthContext.Provider>
//     );
// }
//
// export default AuthContextProvider;

import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import tokenExpired from "../helpers/tokenExpired.jsx";
import tokenUsername from "../helpers/tokenUsername.jsx";

export const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt && !tokenExpired(jwt)) {
            const username = tokenUsername(jwt);
            void login(jwt, username);
        } else {
            logout();
        }
    }, []);

    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [error, toggleError] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [loading, toggleLoading] = useState(false);

    async function authenticate(username, password) {
        toggleError(false);
        toggleLoading(true);

        try {
            const result = await axios.post('http://localhost:1991/login', {
                username: username,
                password: password
            });
            console.log(result.data);
            localStorage.setItem('jwt', result.data.jwt);
            await login(result.data.jwt, username);
            navigate('/profile');
        } catch (e) {
            console.error(e);
            toggleError(true);
        } finally {
            toggleLoading(false);
        }
    }

    async function login(jwt, username) {
        toggleLoading(true);
        try {
            const result = await axios.get(`http://localhost:1991/users/${username}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            });
            toggleIsAuth({
                isAuth: true,
                user: {
                    username: result.data.username,
                },
                status: 'done',
            });
            localStorage.setItem('jwt', jwt);
        } catch (e) {
            console.error(e);
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        } finally {
            toggleLoading(false);
        }
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

    const contextData = {
        ...isAuth,
        authenticate,
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