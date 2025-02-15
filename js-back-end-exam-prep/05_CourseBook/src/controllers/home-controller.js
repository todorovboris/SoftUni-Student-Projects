import { Router } from 'express';
import courseHandler from '../handlers/course-handler.js';

const homeController = Router();

homeController.get('/', async (req, res) => {
    const courses = await courseHandler.getLatestCourse();
    res.render('home', { courses, pageTitle: 'Home' });
});

export default homeController;
