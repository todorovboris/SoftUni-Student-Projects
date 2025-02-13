import Volcano from '../models/Volcano.js';

export default {
    getAllVolcanoes(filter = {}) {
        let query = Volcano.find({});

        return query;
    },
    createVolcano(data, ownerId) {
        return Volcano.create({ ...data, owner: ownerId });
    },
};
