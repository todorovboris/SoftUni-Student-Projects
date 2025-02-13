import Recipe from '../models/Recipe.js';

export default {
    getAllRecipes(filter = {}) {
        let query = Recipe.find({});

        if (filter.search) {
            query = query.where({ title: { $regex: filter.search, $options: 'i' } });
        }

        return query;
    },
    getLatestRecipes() {
        return Recipe.find({}).sort({ _id: 'desc' }).limit(3);
    },
    getOneRecipe(recipeId) {
        return Recipe.findById(recipeId);
    },
    createRecipe(recipeData, ownerId) {
        return Recipe.create({ ...recipeData, owner: ownerId });
    },
    async recommendRecipe(recipeId, userId) {
        return Recipe.findByIdAndUpdate(recipeId, { recommendList: userId });
    },
    async deleteRecipe(recipeId) {
        return Recipe.findByIdAndDelete(recipeId);
    },
    async editRecipe(recipeId, newRecipeData) {
        return Recipe.findByIdAndUpdate(recipeId, newRecipeData, { runValidators: true });
    },
};
