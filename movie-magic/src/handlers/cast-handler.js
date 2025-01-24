import Cast from '../models/Cast.js';

export default {
    async createCast(castData) {
        const newCastPromise = Cast.create({
            ...castData,
            age: Number(castData.age),
        });

        return newCastPromise;
    },

    async getAllCasts() {
        let castsQuery = Cast.find({});
        return castsQuery;
    },
};
