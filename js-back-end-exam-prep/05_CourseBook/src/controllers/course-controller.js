import { Router } from 'express';
import courseHandler from '../handlers/course-handler.js';
import { isAuth } from '../middlewares/auth-middleware.js';
import { getErrorMessage } from '../utils/error-utils.js';

const courseController = Router();

courseController.get('/create', isAuth, (req, res) => {
    res.render('courses/create');
});

courseController.post('/create', isAuth, async (req, res) => {
    const courseData = req.body;
    const userId = req.user?._id;

    try {
        await courseHandler.createCourse(courseData, userId);
        res.redirect('/courses/catalog');
    } catch (err) {
        res.render('courses/create', { course: courseData, error: getErrorMessage(err) });
    }
});

courseController.get('/catalog', async (req, res) => {
    const courses = await courseHandler.getAllCourses();
    res.render('courses/catalog', { courses });
});

export default courseController;
