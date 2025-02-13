import Volcano from '../models/Volcano.js';

export default {
    createVolcano(data, ownerId) {
        return Volcano.create({ ...data, owner: ownerId });
    },
};
