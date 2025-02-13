import Volcano from '../models/Volcano.js';

export default {
    async getAllVolcanoes(filter = {}) {
        let query = Volcano.find({});

        return query;
    },
    async getOneVolcano(volcanoId) {
        return Volcano.findById(volcanoId);
    },
    async createVolcano(data, ownerId) {
        return Volcano.create({ ...data, owner: ownerId });
    },
};
