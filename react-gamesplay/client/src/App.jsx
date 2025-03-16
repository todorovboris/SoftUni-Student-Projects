import './App.css';
import { Routes, Route } from 'react-router';
import Header from './components/header/Header.jsx';
import Home from './components/home/Home.jsx';
import Login from './components/login/Login.jsx';
import Register from './components/register/Register.jsx';
import GameCatalog from './components/game-catalog/GameCatalog.jsx';
import GameCreate from './components/game-create/GameCreate.jsx';
import GameEdit from './components/game-edit/GameEdit.jsx';
import GameDetails from './components/game-details/GameDetails.jsx';

function App() {
    return (
        <div id="box">
            <Header />

            <main id="main-content">
                <Routes>
                    {/* <Route path="/" element={<Home />} /> */}
                    <Route index element={<Home />} /> //! alternative with index
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/games" element={<GameCatalog />} />
                    <Route path="/games/create" element={<GameCreate />} />
                    {/* <Route path="/games/:params/edit" element={<GameEdit />} />
                    <Route path="/games/:params/details" element={<GameDetails />} /> */}
                </Routes>
            </main>
        </div>
    );
}

export default App;
