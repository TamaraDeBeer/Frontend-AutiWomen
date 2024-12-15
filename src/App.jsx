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
import {Routes, Route} from 'react-router-dom';
import ErrorPage from "./pages/errorPage/ErrorPage.jsx";
import AuthContextProvider from "./context/AuthContextProvider.jsx";
import TopicPage from "./pages/topicPage/TopicPage.jsx";
import AdminPage from "./pages/adminPage/AdminPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import UserProfile from "./pages/userProfile/UserProfile.jsx";
import ContactMe from "./pages/contactMe/ContactMe.jsx";
import PrivacyPolicy from "./pages/privacyPolicy/PrivacyPolicy.jsx";
import TermsAndConditions from "./pages/termsAndConditions/TermsAndConditions.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {

    return (
        <AuthContextProvider>
            <Navigation/>
            <main>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/login"} element={<AccountLogin/>}/>
                    <Route path={"/register"} element={<AccountRegister/>}/>
                    <Route path={"/forum"} element={<ForumHome/>}/>
                    <Route path={"/forum"} element={<ForumHome/>}/>
                    <Route path="/forums/topic/:topic" element={<TopicPage/>}/>
                    <Route path="/forums/:forumId" element={<ForumPost/>}/>
                    <Route path="/users/:username" element={<UserProfile/>}/>
                    <Route path={"/profile"} element={<ProtectedRoute component={AccountProfile}/>}/>
                    <Route path={"/forum/create"} element={<ProtectedRoute component={ForumCreate}/>}/>
                    <Route path={"*"} element={<NotFound/>}/>
                    <Route path={"/error"} element={<ErrorPage/>}/>
                    <Route path={"/admin"} element={<PrivateRoute element={AdminPage} roles={['ROLE_ADMIN']}/>}/>
                    <Route path={"/contact"} element={<ContactMe/>}/>
                    <Route path={"/privacy"} element={<PrivacyPolicy/>}/>
                    <Route path={"/terms"} element={<TermsAndConditions/>}/>
                </Routes>
            </main>
            <Footer/>
        </AuthContextProvider>
    );
}

export default App;