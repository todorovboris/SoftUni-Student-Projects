import './App.css';
import { Routes, Route } from 'react-router';
import { useState } from 'react';

import Header from './components/header/Header.jsx';
import Home from './components/home/Home.jsx';
import Login from './components/login/Login.jsx';
import Register from './components/register/Register.jsx';
import GameCatalog from './components/game-catalog/GameCatalog.jsx';
import GameCreate from './components/game-create/GameCreate.jsx';
import GameEdit from './components/game-edit/GameEdit.jsx';
import GameDetails from './components/game-details/GameDetails.jsx';

function App() {
    const [user, setUser] = useState('');

    const userLoginHandler = (authData) => {
        setUser(authData);
    };

    return (
        <div id="box">
            <Header user={user} />

            <main id="main-content">
                <Routes>
                    {/* <Route path="/" element={<Home />} /> */}
                    <Route index element={<Home />} /> //! alternative with index
                    <Route path="/login" element={<Login onLogin={userLoginHandler} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/games" element={<GameCatalog />} />
                    <Route path="/games/create" element={<GameCreate />} />
                    <Route path="/games/:gameId/edit" element={<GameEdit />} />
                    <Route path="/games/:gameId/details" element={<GameDetails email={user} />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
