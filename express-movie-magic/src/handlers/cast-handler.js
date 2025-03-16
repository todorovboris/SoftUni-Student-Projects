import Cast from '../models/Cast.js';

export default {
    async createCast(castData) {
        const newCastPromise = Cast.create({
            ...castData,
            age: Number(castData.age),
        });

        return newCastPromise;
    },

    async getAllCasts(filter = {}) {
        let castsQuery = Cast.find({});

        if (filter.exclude) {
            // castsQuery = castsQuery.find({ _id: { $nin: filter.exclude } }); // *mongodb
            castsQuery = castsQuery.nin('_id', filter.exclude); // *mongoose
        }

        return castsQuery;
    },
};
