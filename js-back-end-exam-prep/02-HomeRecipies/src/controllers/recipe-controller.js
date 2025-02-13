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

export default recipeController;
