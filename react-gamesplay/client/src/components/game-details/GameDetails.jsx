import { useParams, useNavigate } from 'react-router';
import gameService from '../../services/gameService.js';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import CommentsShow from '../comments-show/CommentsShow.jsx';
import CommentsCreate from '../comments-create/CommentsCreate.jsx';
import commentService from '../../services/commentService.js';

export default function GameDetails({ email }) {
    const { gameId } = useParams();
    const [game, setGame] = useState({});
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        gameService.getOne(gameId).then(setGame);

        commentService.getAll(gameId).then(setComments);
    }, [gameId]);

    const deleteGameClickHandler = async () => {
        const confirmForDelete = confirm(`Are you want to delete ${game.title} game?`);

        if (confirmForDelete) {
            await gameService.delete(gameId);

            navigate('/games');
        }
    };

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">{game.summary}</p>

                <CommentsShow comments={comments} />

                {/*<!-- Edit/Delete buttons ( Only for creator of this game )  -->*/}
                <div className="buttons">
                    <Link to={`/games/${gameId}/edit`} className="button">
                        Edit
                    </Link>
                    <button onClick={deleteGameClickHandler} className="button">
                        Delete
                    </button>
                </div>
            </div>

            <CommentsCreate email={email} gameId={gameId} />
        </section>
    );
}
