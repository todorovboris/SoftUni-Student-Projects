import { Router } from 'express';
import { isAuth } from '../middlewares/auth-middleware.js';
import recipeHandler from '../handlers/recipe-handler.js';
import { getErrorMessage } from '../utils/error-utils.js';

const recipeController = Router();

recipeController.get('/create', isAuth, (req, res) => {
    res.render('recipes/create', { pageTitle: 'Create Recipe' });
});

recipeController.post('/create', isAuth, async (req, res) => {
    const recipeData = req.body;
    const ownerId = req.user?._id;

    try {
        await recipeHandler.createRecipe(recipeData, ownerId);
        res.redirect('/recipes/catalog');
    } catch (err) {
        return res.render('recipes/create', { recipe: recipeData, error: getErrorMessage(err) });
    }
});

recipeController.get('/catalog', async (req, res) => {
    const recipes = await recipeHandler.getAllRecipes();

    res.render('recipes/catalog', { recipes });
});

recipeController.get('/:recipeId/details', async (req, res) => {
    const recipeId = req.params.recipeId;
    const recipe = await recipeHandler.getOneRecipe(recipeId);

    const isOwner = recipe.owner.equals(req.user?._id);
    const isRecommend = recipe.recommendList.includes(req.user?._id);

    res.render('recipes/details', { recipe, isOwner, isRecommend });
});

recipeController.get('/:recipeId/recommend', isAuth, async (req, res) => {
    const userId = req.user?._id;
    const recipeId = req.params.recipeId;

    try {
        await recipeHandler.recommendRecipe(recipeId, userId);
        res.redirect(`/recipes/${recipeId}/details`);
    } catch (err) {
        res.render('404', { error: getErrorMessage(err) });
    }
});

recipeController.get('/:recipeId/delete', isAuth, async (req, res) => {
    const recipeId = req.params.recipeId;
    const userId = req.user?._id;

    try {
        await recipeHandler.deleteRecipe(recipeId, userId);
        res.redirect('/recipes/catalog');
    } catch (err) {
        res.render('404', { error: getErrorMessage(err) });
    }
});

export default recipeController;
