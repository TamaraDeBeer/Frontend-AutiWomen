
import './App.css';
import Navigation from './components/navigation/Navigation.jsx';
import Home from './pages/homePage/Home.jsx';
import AccountLogin from './pages/accountLogin/AccountLogin.jsx';
import AccountProfile from "./pages/accountProfile/AccountProfile.jsx";
import AccountRegister from "./pages/accountRegister/AccountRegister.jsx";
import ForumCreate from "./pages/forumCreate/ForumCreate.jsx";
import ForumHome from "./pages/forumHome/ForumHome.jsx";
import ForumPost from "./pages/forumPost/ForumPost.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";
import Footer from './components/footer/Footer.jsx';
// import {Routes, Route, Navigate} from 'react-router-dom';
import ErrorPage from "./pages/errorPage/ErrorPage.jsx";
import AuthContextProvider from "./context/AuthContextProvider.jsx";
import {Route, Routes} from "react-router-dom";
// import {useContext} from "react";

function App() {
    // const { isAuth } = useContext(AuthContext);

    return (
        <AuthContextProvider>
            <Navigation/>
            <main>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/login"} element={<AccountLogin/>}/>
                    <Route path={"/register"} element={<AccountRegister/>}/>
                    <Route path={"/profile"} element={<AccountProfile />}/>
                    {/*<Route path={"/profile"} element={isAuth ? <AccountProfile /> : <Navigate to="/login"/>}/>*/}
                    <Route path={"/forum"} element={<ForumHome/>}/>
                    <Route path={"/forum/create"} element={<ForumCreate/>}/>
                    <Route path={"/forum/:id"} element={<ForumPost/>}/>
                    <Route path={"*"} element={<NotFound/>}/>
                    <Route path={"/error"} element={<ErrorPage/>}/>
                </Routes>
            </main>
            <Footer/>
        </AuthContextProvider>
    );
}

export default App;