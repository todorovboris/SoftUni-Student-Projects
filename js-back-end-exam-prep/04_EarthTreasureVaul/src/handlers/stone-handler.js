import Stone from '../models/Stone.js';

export default {
    getLatestStones() {
        return Stone.find({}).sort({ _id: 'desc' }).limit(3);
    },
    getAllStones() {
        let query = Stone.find({});
        return query;
    },
    createStone(stoneData, userId) {
        return Stone.create({ ...stoneData, owner: userId });
    },
};
