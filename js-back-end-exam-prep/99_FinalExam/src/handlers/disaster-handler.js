import Disaster from '../models/Disaster.js';

export default {
    async createDisaster(data, userId) {
        return Disaster.create({ ...data, owner: userId });
    },
};
