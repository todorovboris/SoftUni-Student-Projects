import './App.css';
import Header from './components/header/Header.jsx';
import Home from './components/home/Home.jsx';

function App() {
    return (
        <div id="box">
            <Header />

            <main id="main-content">
                <Home />
            </main>
        </div>
    );
}

export default App;
