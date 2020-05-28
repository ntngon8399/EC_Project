const db = require('../Connection/dbconnect');
module.exports = {
    GetAllAuthors: async () => {
        const sql = `select * from elearning.authors` ;
        const rows = db.load(sql);
        return rows;
    },
    GetCourseListbyIDSubject: async (IDSubject) => {
        const sql = `select * from subject_course, courses, subjects,author_course,authors where subject_course.course_id = courses.course_id and subject_course.subject_id = '${IDSubject}' and subjects.subject_id = '${IDSubject}'  and courses.course_id = author_course.course_id and authors.author_id = author_course.author_id`;
        const rows = db.load(sql);
        return rows;
    }
}