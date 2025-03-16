import { Link } from 'react-router';
export default function GameCatalog() {
    return (
        <section id="catalog-page">
            <h1>All Games</h1>

            {/*<!-- Display div: with information about every game (if any) -->*/}
            <div className="allGames">
                <div className="allGames-info">
                    <img src="/images/avatar-1.jpg" />
                    <h6>Action</h6>
                    <h2>Cover Fire</h2>
                    <Link to="#" className="details-button">
                        Details
                    </Link>
                </div>
            </div>
            <div className="allGames">
                <div className="allGames-info">
                    <img src="/images/avatar-1.jpg" />
                    <h6>Action</h6>
                    <h2>Zombie lang</h2>
                    <Link to="#" className="details-button">
                        Details
                    </Link>
                </div>
            </div>
            <div className="allGames">
                <div className="allGames-info">
                    <img src="/images/avatar-1.jpg" />
                    <h6>Action</h6>
                    <h2>MineCraft</h2>
                    <Link to="#" className="details-button">
                        Details
                    </Link>
                </div>
            </div>

            {/*<!-- Display paragraph: If there is no games  -->*/}
            <h3 className="no-articles">No articles yet</h3>
        </section>
    );
}
