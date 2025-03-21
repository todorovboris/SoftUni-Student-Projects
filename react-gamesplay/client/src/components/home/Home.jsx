import { useLatestGames } from '../../api/gameApi.js';
import HomeLatestItem from './home-latest-item/HomeLatestItem.jsx';

export default function Home() {
    const { latestGames } = useLatestGames();

    return (
        <section id="welcome-world">
            <div className="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in GamesPlay</h3>
            </div>
            <img src="/images/four_slider_img01.png" alt="hero" />

            <div id="home-page">
                <h1>Latest Games</h1>

                {latestGames.length > 0 ? latestGames.map((game) => <HomeLatestItem key={game._id} {...game} />) : <p className="no-articles">No games yet</p>}
            </div>
        </section>
    );
}
