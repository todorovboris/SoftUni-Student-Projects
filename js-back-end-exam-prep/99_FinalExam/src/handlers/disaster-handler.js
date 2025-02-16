import Disaster from '../models/Disaster.js';

export default {
    async getAllDisasters(filter = {}) {
        let query = Disaster.find({});
        return query;
    },
    async getOneDisaster(disasterId) {
        return Disaster.findById(disasterId);
    },
    async createDisaster(data, userId) {
        return Disaster.create({ ...data, owner: userId });
    },
    async interestDisaster(disasterId, userId) {
        return Disaster.findByIdAndUpdate(disasterId, { $push: { interestedList: userId } });
    },
};
