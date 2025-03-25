import { Routes, Route } from 'react-router';

import { UserProvider } from './components/providers/UserProvider.jsx';

import Header from './components/header/Header.jsx';
import Home from './components/home/Home.jsx';
import Login from './components/login/Login.jsx';
import Register from './components/register/Register.jsx';
import GameCatalog from './components/game-catalog/GameCatalog.jsx';
import GameCreate from './components/game-create/GameCreate.jsx';
import GameEdit from './components/game-edit/GameEdit.jsx';
import GameDetails from './components/game-details/GameDetails.jsx';
import Logout from './components/logout/Logout.jsx';
import AuthGuardBasic from './components/guards/AuthGuardBasic.jsx';
import './App.css';

function App() {
    return (
        <UserProvider>
            <div id="box">
                <Header />

                <main id="main-content">
                    <Routes>
                        {/* <Route path="/" element={<Home />} /> */}
                        <Route index element={<Home />} /> //! alternative with index
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/games" element={<GameCatalog />} />
                        <Route
                            path="/games/create"
                            element={
                                <AuthGuardBasic>
                                    <GameCreate />
                                </AuthGuardBasic>
                            }
                        />
                        <Route path="/games/:gameId/edit" element={<GameEdit />} />
                        <Route path="/games/:gameId/details" element={<GameDetails />} />
                    </Routes>
                </main>
            </div>
        </UserProvider>
    );
}

export default App;
