import Cast from '../models/Cast.js';

export default {
    async createCast(castData) {
        // TODO: Create cast
        const newCastPromise = Cast.create({
            ...castData,
            age: Number(castData.age),
        });

        return newCastPromise;
    },
};
