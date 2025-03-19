import { useEffect, useState } from 'react';
import request from '../utils/request.js';
import useAuthorization from '../hooks/useAuth.js';

const baseUrl = 'http://localhost:3030/data/games';

//* hook on mount
export const useGames = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        request.get(baseUrl).then(setGames);
    }, []);

    return { games };
};

export const useGame = (gameId) => {
    const [game, setGame] = useState({});

    useEffect(() => {
        request.get(`${baseUrl}/${gameId}`).then(setGame);
    }, [gameId]);

    return { game };
};

//* hook on event
export const useGameCreate = () => {
    const { options } = useAuthorization();

    const create = (gameData) => {
        return request.post(baseUrl, gameData, options);
    };

    return { create };
};

export const useGameEdit = () => {
    const { options } = useAuthorization();

    const edit = (gameId, newGameData) => {
        request.put(`${baseUrl}/${gameId}`, { ...newGameData, _id: gameId }, options);
    };

    return { edit };
};

export const useGameDelete = () => {
    const { options } = useAuthorization();

    const deleteGame = (gameId) => {
        request.delete(`${baseUrl}/${gameId}`, options);
    };

    return { deleteGame };
};
