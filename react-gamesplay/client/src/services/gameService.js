// import { request } from '../utils/requester.js';

import request from '../utils/request.js';

const baseUrl = 'http://localhost:3030/jsonstore/games';

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
