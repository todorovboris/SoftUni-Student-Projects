import Recipe from '../models/Recipe.js';

export default {
    getAllRecipes(filter = {}) {
        let query = Recipe.find({});

        return query;
    },
    getLatestRecipes() {
        return Recipe.find({}).sort({ _id: 'desc' }).limit(3);
    },
    getOneRecipe(recipeId) {
        return Recipe.findById(recipeId);
    },
    async createRecipe(recipeData, ownerId) {
        const promise = Recipe.create({
            ...recipeData,
            owner: ownerId,
        });

        return promise;
    },
    async recommendRecipe(recipeId, userId) {
        const recipe = await Recipe.findById(recipeId);

        if (recipe.owner.equals(userId)) {
            throw new Error('Cannot recommend your own recipe!');
        }

        if (recipe.recommendList.includes(userId)) {
            throw new Error('You already recommend this recipe!');
        }

        return Recipe.findByIdAndUpdate(recipeId, { recommendList: userId });
    },
};
