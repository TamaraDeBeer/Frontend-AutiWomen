import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextProvider.jsx';

function ProtectedRoute({ component: Component }) {
    const { isAuth } = useContext(AuthContext);
    return isAuth ? <Component /> : <Navigate to="/*" />;
}

export default ProtectedRoute;