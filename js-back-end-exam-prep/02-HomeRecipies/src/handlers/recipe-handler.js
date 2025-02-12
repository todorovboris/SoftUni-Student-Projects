import Recipe from '../models/Recipe.js';

export default {
    getAllRecipes(filter = {}) {
        let query = Recipe.find({});

        return query;
    },
    getLatestRecipes() {
        return Recipe.find({}).sort({ _id: 'desc' }).limit(3);
    },
    async createRecipe(recipeData, ownerId) {
        const promise = Recipe.create({
            ...recipeData,
            owner: ownerId,
        });

        return promise;
    },
};
