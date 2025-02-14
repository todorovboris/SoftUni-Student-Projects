import Stone from '../models/Stone.js';

export default {
    getLatestStones() {
        return Stone.find({}).sort({ _id: 'desc' }).limit(3);
    },
    getAllStones() {
        let query = Stone.find({});
        return query;
    },
    getOneStone(stoneId) {
        return Stone.findById(stoneId);
    },
    createStone(stoneData, userId) {
        return Stone.create({ ...stoneData, owner: userId });
    },
    async likeStone(stoneId, userId) {
        return Stone.findByIdAndUpdate(stoneId, { $push: { likedList: userId } });
    },
    async deleteStone(stoneId) {
        return Stone.findByIdAndDelete(stoneId);
    },
    async editStone(stoneId, newStoneData) {
        return Stone.findByIdAndUpdate(stoneId, newStoneData, { runValidators: true });
    },
};
