import { Navigate, useNavigate, useParams } from 'react-router';
import { useGame, useGameEdit } from '../../api/gameApi.js';
import useAuthorization from '../../hooks/useAuth.js';

export default function GameEdit() {
    const { userId } = useAuthorization();
    const navigate = useNavigate();
    const { gameId } = useParams();
    const { game } = useGame(gameId);
    const { edit } = useGameEdit();

    const formAction = async (formData) => {
        const newGameData = Object.fromEntries(formData);

        await edit(gameId, newGameData);

        navigate(`/games/${gameId}/details`);
    };

    const isOwner = userId === game._ownerId;
    if (!isOwner) {
        return <Navigate to="/games" />;
    }

    return (
        <section ac id="edit-page" className="auth">
            <form id="edit" action={formAction}>
                <div className="container">
                    <h1>Edit Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" defaultValue={game.title} />

                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" defaultValue={game.category} />

                    <label htmlFor="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" defaultValue={game.maxLevel} />

                    <label htmlFor="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" defaultValue={game.imageUrl} />

                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary" defaultValue={game.summary}></textarea>
                    <input className="btn submit" type="submit" value="Edit Game" />
                </div>
            </form>
        </section>
    );
}
