import React from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation.jsx';
import Home from './pages/homePage/Home.jsx';
import Footer from './components/footer/Footer.jsx';
import {Routes, Route} from 'react-router-dom';

function App() {
    return (
        <>
            <Navigation/>
            <main>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>

                </Routes>
            </main>
            <Footer/>

        </>

    );
}

export default App;