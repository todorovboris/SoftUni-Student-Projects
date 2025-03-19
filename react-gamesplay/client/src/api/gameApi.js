import { useContext } from 'react';
import request from '../utils/request.js';
import { UserContext } from '../contexts/UserContext.js';

const baseUrl = 'http://localhost:3030/data/games';

export default {
    async getAll() {
        const result = await request.get(baseUrl);

        const games = Object.values(result);
        return games;
    },
    async getOne(gameId) {
        const game = request.get(`${baseUrl}/${gameId}`);
        console.log(game);

        return request.get(`${baseUrl}/${gameId}`);
    },
    create(gameData) {
        return request.post(baseUrl, gameData);
    },
    delete(gameId) {
        return request.delete(`${baseUrl}/${gameId}`);
    },
    edit(gameId, newGameData) {
        return request.put(`${baseUrl}/${gameId}`, { ...newGameData, _id: gameId });
    },
};

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
