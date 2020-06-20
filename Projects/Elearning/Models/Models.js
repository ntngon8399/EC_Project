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
    },
    GetDetailCourse: async (IDSubject,IDCourse) => {
        const sql = `select * from subject_course, courses, subjects,author_course,authors where subject_course.course_id = courses.course_id and subject_course.subject_id = '${IDSubject}' and subjects.subject_id = '${IDSubject}' and courses.course_id = author_course.course_id and authors.author_id = author_course.author_id and courses.course_id = '${IDCourse}'`;
        const rows = db.load(sql);
        return rows;
    },
    GetFeedBackByCourseID: async (IDCourse) => {
        const sql = `select * from feedback where course_id = '${IDCourse}'`;
        const rows = db.load(sql);
        return rows;
    },
    CountFeedBackByCourseID: async (IDCourse) => {
        const sql = `select count(*) AS dem from feedback where course_id = '${IDCourse}'`;
        const rows = db.load(sql);
        return rows;
    },
    GetCourseByKeyWord: async (KeyWord) => {
        const sql = `select * from Courses, subjects, subject_course, author_course, authors where course_title like '%${KeyWord}%' and subjects.subject_id = subject_course.subject_id and subject_course.course_id = Courses.course_id and Courses.course_id = author_course.course_id and authors.author_id = author_course.author_id` ;
        const rows = db.load(sql);
        return rows;
    },
    GetCountCourseByKeyWord: async (KeyWord) => {
        const sql = `select count(*) AS dem from Courses where course_title like '%${KeyWord}%'` ;
        const rows = db.load(sql);
        return rows;
    },
    // InsertCourseToCartByIDCourse: async (IDCourse,IDStudent) => {
    //     const rows1 = await db.load('select * from cart');
    //     const len = rows1.length + 1;
    //     const CartID =  'CA0' + len;
    //     const THOI_DIEM = '2020-01-01 20:22:00';
    //     const sql = `INSERT INTO cart VALUES ('${CartID}','${IDStudent}','${THOI_DIEM}',0,0,0)` ;
    //     const rows = db.load(sql);
    //     return rows;
    // },
    InsertCartItem: async(IDStudent, IDCourse) => {
        const cartidrow = await db.load(`select cart_id from cart where student_id = '${IDStudent}'`);
        const cartid = cartidrow[0].cart_id;
        const sql = `INSERT INTO cartitems VALUES ('${cartid}','${IDCourse}');`;
        const rows = db.load(sql);
        return rows;
    },
    GetAllCartItemByIDStudent: async(IDStudent) => {
        const sql = `select *,courses.course_price - courses.course_price*(discount.saleoff/100) AS Totalprice1 from cart, cartitems,courses,discount where student_id = '${IDStudent}' and cartitems.cart_id = cart.cart_id and courses.course_id = cartitems.course_id and courses.course_id  = discount.course_id`;
        const rows = db.load(sql);
        return rows;
    },
    CountCartItemByIDStudent: async(IDStudent) => {
        const sql = `select count(*) AS dem from cart, cartitems where student_id = '${IDStudent}' and cartitems.cart_id = cart.cart_id`;
        const rows = db.load(sql);
        return rows;
    },
    RemoveCartItems: async(IDcart, IDcourse) => {
        const sql = `delete from cartitems where cart_id = '${IDcart}' and course_id='${IDcourse}';`;
        const rows = db.load(sql);
        return rows;
    },
    GetTotalPrice: async (IDcart) => {
        const sql = `select sum(TONG.Totalprice1) AS total from (select courses.course_price - courses.course_price*(discount.saleoff/100) AS Totalprice1 from cart, cartitems,courses,discount where cart.cart_id = '${IDcart}' and cartitems.cart_id = cart.cart_id and courses.course_id = cartitems.course_id and courses.course_id  = discount.course_id) AS TONG;`;
        const rows = db.load(sql);
        return rows;
    },
    CheckCourseIfExsistInCart: async(IDstudent, IDcourse) => {

        const sql = `select count(*) AS dem from cart, cartitems where student_id = '${IDstudent}' and cartitems.cart_id = cart.cart_id and cartitems.course_id = '${IDcourse}'`;
        const rows = db.load(sql);
        return rows;
    },
    GetAllCourseDiscount: async(saleoff) => {
        const sql = `select * from courses,subject_course, discount where courses.course_id = discount.course_id and subject_course.course_id = courses.course_id and discount.saleoff >= ${saleoff}`;
        const rows = db.load(sql);
        return rows;
    },
    CountSubscibersAllCourses: async() => {
        const sql = `select courses.course_title,authors.author_fname,authors.author_lname, count(enroll.student_id) AS SLER from courses, enroll,author_course,authors where courses.course_id = enroll.course_id  and author_course.course_id = courses.course_id and authors.author_id = author_course.author_id group by courses.course_title,authors.author_fname,authors.author_lname`;
        const rows = db.load(sql);
        return rows;
    },
    GetAllStudent: async() => {
        const sql = `SELECT * FROM elearning.students`;
        const rows = db.load(sql);
        return rows;
    },
    ManageEnrollByMonth: async() => {
        const sql = `select MONTH(enroll.enroll_date) AS month,count(*) as sl from enroll group by MONTH(enroll.enroll_date)`;
        const rows = db.load(sql);
        return rows;
    },
    TOP6RatingCourse: async() => {
        const sql = `SELECT ROW_NUMBER() OVER (ORDER BY (select 1)) as STT, T.course_title, T.AVE FROM (select course_title ,sum(rating_star)/count(course_title) AS AVE from elearning.feedback,courses
        where courses.course_id = feedback.course_id
        group by courses.course_title
        order by AVE DESC
        LIMIT 6 )AS T
        `;
        const rows = db.load(sql);
        return rows;
    }
    
}