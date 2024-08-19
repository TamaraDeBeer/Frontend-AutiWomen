
import './App.css';
import Navigation from './components/navigation/Navigation.jsx';
import Home from './pages/homePage/Home.jsx';
import AccountLogin from './pages/accountLogin/AccountLogin.jsx';
import AccountProfile from "./pages/accountProfile/AccountProfile.jsx";
import AccountRegister from "./pages/accountRegister/AccountRegister.jsx";
import ArticlesHome from "./pages/articlesHome/ArticlesHome.jsx";
import BlogHome from "./pages/blogHome/BlogHome.jsx";
import ForumCreate from "./pages/forumCreate/ForumCreate.jsx";
import ForumHome from "./pages/forumHome/ForumHome.jsx";
import ForumPost from "./pages/forumPost/ForumPost.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";
import Footer from './components/footer/Footer.jsx';
import {Routes, Route} from 'react-router-dom';

function App() {
    return (
        <>
            <Navigation/>
            <main>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/login"} element={<AccountLogin/>}/>
                    <Route path={"/register"} element={<AccountRegister/>}/>
                    <Route path={"/profile"} element={<AccountProfile/>}/>
                    <Route path={"/articles"} element={<ArticlesHome/>}/>
                    <Route path={"/blog"} element={<BlogHome/>}/>
                    <Route path={"/forum"} element={<ForumHome/>}/>
                    <Route path={"/forum/create"} element={<ForumCreate/>}/>
                    <Route path={"/forum/:id"} element={<ForumPost/>}/>
                    <Route path={"*"} element={<NotFound/>}/>
                </Routes>
            </main>
            <Footer/>

        </>
    );
}

export default App;