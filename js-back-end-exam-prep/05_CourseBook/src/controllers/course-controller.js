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

courseController.get('/:courseId/details', async (req, res) => {
    const courseId = req.params.courseId;
    const course = await courseHandler.getOneCourse(courseId);

    const isOwner = course.owner.equals(req.user?._id);
    const isSigned = course.signUpList.some((obj) => obj._id.equals(req.user?._id));

    res.render('courses/details', { course, isOwner, isSigned });
});

courseController.get('/:courseId/sign', isAuth, async (req, res) => {
    const userId = req.user?._id;
    const courseId = req.params.courseId;
    const course = await courseHandler.getOneCourse(courseId);

    if (course.owner.equals(userId)) {
        return res.render('404', { error: 'Cannot sign your own course!' });
    }

    if (course.signUpList.some((obj) => obj._id.equals(req.user?._id))) {
        return res.render('404', { error: 'You already signed this course!' });
    }

    try {
        await courseHandler.signCourse(courseId, userId);
        res.redirect(`/courses/${courseId}/details`);
    } catch (err) {
        res.render('404', { error: getErrorMessage(err) });
    }
});

courseController.get('/:courseId/delete', isAuth, async (req, res) => {
    const courseId = req.params.courseId;
    const course = await courseHandler.getOneCourse(courseId);

    if (!course.owner.equals(req.user?._id)) {
        return res.render('404', { error: 'You are not the course owner!' });
    }

    try {
        await courseHandler.deleteCrourse(courseId);
        res.redirect('/courses/catalog');
    } catch (err) {
        return res.render('404', { error: getErrorMessage(err) });
    }
});

courseController.get('/:courseId/edit', isAuth, async (req, res) => {
    const courseId = req.params.courseId;
    const course = await courseHandler.getOneCourse(courseId);

    if (!course.owner.equals(req.user?._id)) {
        return res.render('404', { error: 'You are not the course owner!' });
    }

    res.render('courses/edit', { course });
});

courseController.post('/:courseId/edit', isAuth, async (req, res) => {
    const newData = req.body;
    const courseId = req.params.courseId;

    try {
        await courseHandler.editCourse(courseId, newData);
        res.redirect(`/courses/${courseId}/details`);
    } catch (err) {
        return res.render('courses/edit', { course: newData, error: getErrorMessage(err) });
    }
});

export default courseController;
