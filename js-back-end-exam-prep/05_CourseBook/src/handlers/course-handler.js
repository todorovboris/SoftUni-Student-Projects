import Course from '../models/Course.js';

export default {
    getLatestCourse() {
        return Course.find({}).sort({ _id: 'desc' }).limit(3);
    },
    getAllCourses() {
        let query = Course.find({});
        return query;
    },
    createCourse(courseData, userId) {
        return Course.create({ ...courseData, owner: userId });
    },
};
