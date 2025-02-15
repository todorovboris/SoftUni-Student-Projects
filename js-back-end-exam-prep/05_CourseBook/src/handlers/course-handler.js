import Course from '../models/Course.js';

export default {
    createCourse(courseData, userId) {
        return Course.create({ ...courseData, owner: userId });
    },
};
