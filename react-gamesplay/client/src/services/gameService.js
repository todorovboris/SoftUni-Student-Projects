// import { request } from '../utils/requester.js';

import request from '../utils/request.js';

const baseUrl = 'http://localhost:3030/jsonstore/games';

export default {
    async getAll() {
        const result = await request.get(baseUrl);

        const games = Object.values(result);
        return games;
    },
    create(gameData) {
        return request.post(baseUrl, gameData);
    },
};
