import { useParams, useNavigate } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import CommentsShow from '../comments-show/CommentsShow.jsx';
import CommentsCreate from '../comments-create/CommentsCreate.jsx';
import commentService from '../../services/commentService.js';
import { UserContext } from '../../contexts/UserContext.js';
import { useGame, useGameDelete } from '../../api/gameApi.js';
import useAuthorization from '../../hooks/useAuth.js';

export default function GameDetails() {
    const navigate = useNavigate();
    const { email, _id: userId } = useContext(UserContext);
    // const { email } = useAuthorization(); //! alternative way to take the email

    const [comments, setComments] = useState([]);
    const { gameId } = useParams();
    const { game } = useGame(gameId);
    const { deleteGame } = useGameDelete();

    useEffect(() => {
        commentService.getAll(gameId).then(setComments);
    }, [gameId]);

    const deleteGameClickHandler = async () => {
        const confirmForDelete = confirm(`Are you want to delete ${game.title} game?`);

        if (confirmForDelete) {
            await deleteGame(gameId);
            navigate('/games');
        }

        return;
    };

    const commentCreateHandler = (newComment) => {
        setComments((state) => [...state, newComment]);
    };

    const isOwner = userId === game._ownerId;

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
                {isOwner && (
                    <div className="buttons">
                        <Link to={`/games/${gameId}/edit`} className="button">
                            Edit
                        </Link>
                        <button onClick={deleteGameClickHandler} className="button">
                            Delete
                        </button>
                    </div>
                )}
            </div>

            <CommentsCreate email={email} gameId={gameId} onCreate={commentCreateHandler} />
        </section>
    );
}
