import Stone from '../models/Stone.js';

export default {
    createStone(stoneData, userId) {
        return Stone.create({ ...stoneData, owner: userId });
    },
};
