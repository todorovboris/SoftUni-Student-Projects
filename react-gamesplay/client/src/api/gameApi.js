import { useEffect, useState } from 'react';
import request from '../utils/request.js';
import useAuthorization from '../hooks/useAuth.js';

const baseUrl = 'http://localhost:3030/data/games';

export default {
    // delete(gameId) {
    //     return request.delete(`${baseUrl}/${gameId}`);
    // },
    // edit(gameId, newGameData) {
    //     return request.put(`${baseUrl}/${gameId}`, { ...newGameData, _id: gameId });
    // },
};

export const useGameDelete = () => {
    const { options } = useAuthorization();

    const deleteGame = (gameId) => {
        request.delete(`${baseUrl}/${gameId}`, options);
    };

    return { deleteGame };
};

export const useGameEdit = () => {
    const { options } = useAuthorization();

    const edit = (gameId, newGameData) => {
        request.put(`${baseUrl}/${gameId}`, { ...newGameData, _id: gameId }, options);
    };

    return { edit };
};

export const useGame = (gameId) => {
    const [game, setGame] = useState({});

    useEffect(() => {
        request.get(`${baseUrl}/${gameId}`).then(setGame);
    }, [gameId]);

    return { game };
};

//* hook on mount
export const useGames = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        request.get(baseUrl).then(setGames);
    }, []);

    return { games };
};

//* hook on event
export const useGameCreate = () => {
    const { options } = useAuthorization();

    const create = (gameData) => {
        return request.post(baseUrl, gameData, options);
    };

    return { create };
};
