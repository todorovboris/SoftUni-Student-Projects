import { useParams, useNavigate } from 'react-router';
import { Link } from 'react-router';
import CommentsShow from '../comments-show/CommentsShow.jsx';
import CommentsCreate from '../comments-create/CommentsCreate.jsx';
import { useUserContext } from '../../contexts/UserContext.js';
import { useGame, useGameDelete } from '../../api/gameApi.js';
import useAuthorization from '../../hooks/useAuth.js';
import { useComments, useCreateComment } from '../../api/commentsApi.js';
import { useOptimistic } from 'react';
import { v4 as uuid } from 'uuid';

export default function GameDetails() {
    const navigate = useNavigate();
    // const { email, _id: userId } = useUserContext();
    const { email, userId } = useAuthorization(); //! alternative way to take the email

    const { gameId } = useParams();
    const { game } = useGame(gameId);
    const { deleteGame } = useGameDelete();
    const { create } = useCreateComment();
    const { comments, addComment } = useComments(gameId);
    const [optimisticComments, setOptimisticComments] = useOptimistic(comments);

    const deleteGameClickHandler = async () => {
        const confirmForDelete = confirm(`Are you want to delete ${game.title} game?`);

        if (confirmForDelete) {
            await deleteGame(gameId);
            navigate('/games');
        }

        return;
    };

    const commentCreateHandler = async (comment) => {
        //* Optimistic Update
        const newOptimisticComment = {
            _id: uuid(),
            _ownerId: userId,
            gameId,
            comment,
            pending: true,
        };
        setOptimisticComments((optimisticState) => [...optimisticState, newOptimisticComment]);

        //* Server Update
        const commentResult = await create(gameId, comment);

        //* Local state Update
        addComment(commentResult);
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

                <CommentsShow comments={optimisticComments} />

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
