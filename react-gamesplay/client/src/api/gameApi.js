import { useContext, useEffect, useState } from 'react';
import request from '../utils/request.js';
import { UserContext } from '../contexts/UserContext.js';

const baseUrl = 'http://localhost:3030/data/games';

export default {
    async getOne(gameId) {
        const game = request.get(`${baseUrl}/${gameId}`);

        return request.get(`${baseUrl}/${gameId}`);
    },

    delete(gameId) {
        return request.delete(`${baseUrl}/${gameId}`);
    },
    edit(gameId, newGameData) {
        return request.put(`${baseUrl}/${gameId}`, { ...newGameData, _id: gameId });
    },
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
export const useCreateGame = () => {
    const { accessToken } = useContext(UserContext);

    const options = {
        headers: {
            'X-Authorization': accessToken,
        },
    };

    const create = (gameData) => {
        return request.post(baseUrl, gameData, options);
    };

    return { create };
};
