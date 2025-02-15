import Course from '../models/Course.js';

export default {
    getLatestCourse() {
        return Course.find({}).sort({ _id: 'desc' }).limit(3);
    },
    getAllCourses() {
        let query = Course.find({});
        return query;
    },
    getOneCourse(courseId) {
        return Course.findById(courseId).populate('owner').populate('signUpList');
    },
    createCourse(courseData, userId) {
        return Course.create({ ...courseData, owner: userId });
    },
    async signCourse(courseId, userId) {
        return Course.findByIdAndUpdate(courseId, { $push: { signUpList: userId } });
    },
};
