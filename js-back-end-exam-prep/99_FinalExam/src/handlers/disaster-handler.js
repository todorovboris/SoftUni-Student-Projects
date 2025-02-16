import Disaster from '../models/Disaster.js';

export default {
    async getAllDisasters(filter = {}) {
        let query = Disaster.find({});

        if (filter.search) {
            query = query.where({ name: { $regex: filter.search, $options: 'i' } });
        }

        if (filter.type) {
            query = query.where({ type: { $regex: filter.type, $options: 'i' } });
        }

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
    async deleteDisaster(disasterId) {
        return Disaster.findByIdAndDelete(disasterId);
    },
    async editDisaster(disasterId, newData) {
        return Disaster.findByIdAndUpdate(disasterId, newData, { runValidators: true });
    },
};
