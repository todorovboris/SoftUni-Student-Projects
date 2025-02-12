import { Router } from 'express';
import recipeHandler from '../handlers/recipe-handler.js';

const homeController = Router();

homeController.get('/', async (req, res) => {
    const latestRecipes = await recipeHandler.getLatestRecipes();
    res.render('home', { latestRecipes, pageTitle: 'Home' });
});

export default homeController;
