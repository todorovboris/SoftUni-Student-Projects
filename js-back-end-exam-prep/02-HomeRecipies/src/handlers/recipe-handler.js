import Recipe from '../models/Recipe.js';

export default {
    getAllRecipes(filter = {}) {
        let query = Recipe.find({});

        return query;
    },
    async createRecipe(recipeData, ownerId) {
        const promise = Recipe.create({
            ...recipeData,
            owner: ownerId,
        });

        return promise;
    },
};
