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

export const useLatestGames = () => {
    const [latestGames, setLatestGames] = useState([]);

    useEffect(() => {
        const searchParams = new URLSearchParams({
            sortBy: '_createdOn desc',
            pageSize: 3,
            select: '_id,imageUrl,title',
        });

        request.get(`${baseUrl}?${searchParams.toString()}`).then(setLatestGames);
    }, []);

    return { latestGames };
};

//* hook on event
export const useGameCreate = () => {
    const { request } = useAuthorization();

    const create = (gameData) => {
        return request.post(baseUrl, gameData);
    };

    return { create };
};

export const useGameEdit = () => {
    const { request } = useAuthorization();

    const edit = (gameId, newGameData) => {
        request.put(`${baseUrl}/${gameId}`, { ...newGameData, _id: gameId });
    };

    return { edit };
};

export const useGameDelete = () => {
    const { request } = useAuthorization();

    const deleteGame = (gameId) => {
        request.delete(`${baseUrl}/${gameId}`);
    };

    return { deleteGame };
};
