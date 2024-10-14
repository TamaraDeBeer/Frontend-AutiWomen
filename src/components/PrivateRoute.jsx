import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextProvider.jsx';

function PrivateRoute({ element: Component, roles }) {
    const { isAuth, user } = useContext(AuthContext);

    if (!isAuth || !roles.includes(user.role)) {
        return <Navigate to="/error" />;
    }

    return <Component />;
}

export default PrivateRoute;