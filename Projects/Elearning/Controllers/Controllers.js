const express = require('express');
const router = express.Router();
const model = require('../Models/Models');
const bodyParser = require('body-parser');
const Passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const Models = require('../Models/Models');

//Passport setup
router.use(session({
    secret: "mysecret",
    cookie: {
        maxAge: 1000 * 60 * 5
    }
}));
router.use(Passport.initialize());
router.use(Passport.session());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

Passport.use(new LocalStrategy(
    async (username, password, done) => {
        const usr = await model.CheckUsernameAndPass(username, password);
        const id = usr[0].student_id;
        //console.log(id);
        if (usr[0].checkresults == 1) { //Nếu chỗ này sửa lại thành >0 thì database sẽ hack được bằng SQL injection.
            return done(null, id);
        } else return done(null, false);
    }
));

Passport.serializeUser((id, done) => {
    done(null, id);
});

Passport.deserializeUser((id, done) => {
    console.log('User đăng nhập hiện tại:' + id);
    return done(null, id);
});

router.get('/login', async (req, res) => {
    res.render('../views/LoginPage/Login.hbs');
});
router.post('/login', Passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

//Ket thuc setup passport---

//router.use('../public',express.static('public'));
router.get('/register', async (req, res) => {
    if (req.isAuthenticated() == false) {
        res.render('../views/LoginPage/Register.hbs');
    } else {
        res.render('../views/LoginPage/Login.hbs');
    }
});
router.post('/register', async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const firtname = req.body.firstname;
    const lastname = req.body.lastname;
    const mail = req.body.mail;
    const phone = req.body.phone;

    const IDstu = await model.GetStudentIDTop1();
    var id = parseInt(IDstu[0].ID);
    id = id + 1;
    var stu_id;
    if (id < 10) {
        stu_id = "ST00" + id;
    } else if (id < 100 && id >= 10) {
        stu_id = "ST0" + id;
    } else {
        stu_id = "ST" + id;
    }
    var studentID = String(stu_id);  //Tao ID Student moi.
    const picture_link = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSnlVwlWdJBGf3RoYzkrBwoFXqVBVz1B8LxyQ&usqp=CAU';
    await model.InsertUser(studentID,username, password,picture_link,firtname,lastname,mail,phone);
    console.log('Đã tạo thành công user '+firtname+lastname+' mã ' + studentID);
    res.render('../views/animationPage/Welcome.hbs');

});


router.get('/', async (req, res) => {
    // console.log(req.isAuthenticated());
    const CheckUser = req.isAuthenticated();
    if (req.isAuthenticated()) {
        //Trang chủ dành cho user.
        const la = await model.GetAllAuthors();
        const dcc = await model.GetAllCourseDiscount(1);
        res.render('../views/HomePage/Home', { listauthors: la, discountcourse: dcc, CheckUser });
    } else {
        //Trang chủ cho khách vãng lai
        const la = await model.GetAllAuthors();
        const dcc = await model.GetAllCourseDiscount(1);
        res.render('../views/HomePage/Home', { listauthors: la, discountcourse: dcc, CheckUser });
    }
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});


router.get('/Courses/:IDSubject', async (req, res) => {
    const CheckUser = req.isAuthenticated();
    const lc = await model.GetCourseListbyIDSubject(req.params.IDSubject);
    res.render('../views/CoursesPage/ListCourse.hbs', { ListCourse: lc, CheckUser });
});

router.get('/Courses/:IDSubject/:IDCourse', async (req, res) => {
    const CheckUser = req.isAuthenticated();
    const IDstudent = 'ST002';
    const cour = await model.GetDetailCourse(req.params.IDSubject, req.params.IDCourse);
    const fb = await model.GetFeedBackByCourseID(req.params.IDCourse);
    const countfb = await model.CountFeedBackByCourseID(req.params.IDCourse);
    const IDcourseadd = req.query.addtocart;
    const CheckIfExists = await model.CheckCourseIfExsistInCart(IDstudent, req.params.IDCourse);

    if (IDcourseadd != undefined) {
        model.InsertCartItem(IDstudent, IDcourseadd);
        console.log('ADD TO CART OF STUDENT ' + IDstudent + ': COURSE ' + IDcourseadd);
    }

    res.render('../views/CourseDetailPage/CourseDetail.hbs', { Course: cour[0], Feedback: fb, CountFB: countfb[0], Check: CheckIfExists[0], CheckUser });
});

router.get('/Search', async (req, res) => {
    //console.log(req.query.coursename);
    const CheckUser = req.isAuthenticated();
    const search = await model.GetCourseByKeyWord(req.query.coursename);
    const countsearch = await model.GetCountCourseByKeyWord(req.query.coursename);
    res.render('../views/SearchPage/ListSearch.hbs', { LS: search, CS: countsearch[0], CheckUser });
});
router.get('/Cart', async (req, res) => {
    const CheckUser = req.isAuthenticated();
    const IDstudent = 'ST002'; //Nho sua cho nay
    const IDCart = 'CA001';//Nho sua cho nay
    const CountCartItem = await model.CountCartItemByIDStudent(IDstudent);
    const LI = await model.GetAllCartItemByIDStudent(IDstudent);
    const RIDCart = req.query.removeCartID;
    const RIDCourse = req.query.removeCourseID;
    if (RIDCourse != undefined && RIDCart != undefined) {
        await model.RemoveCartItems(RIDCart, RIDCourse);
        console.log('REMOVE: CART ' + RIDCart + ': COURSE ' + RIDCourse);
    }
    const Total = await model.GetTotalPrice(IDCart);
    //model.RemoveCartItems(req.query.removeCartID,req.query.removeCourseID); 
    res.render('../views/CartItemPage/CartItem.hbs', { ListItem: LI, demcart: CountCartItem[0], totalPrice: Total[0], CheckUser });
});

router.get('/LoadingAdmin',async(req,res) => {
    res.render('../views/animationPage/LoadingAdmin.hbs');
});

router.get('/admin', async (req, res) => {
    //const MonthMana = await model.ManageEnrollByMonth();
    const StuMoney = await model.GetMoneyALlStudent();
    const RevPerMon = await model.GetRevenuePerMonth();
    res.render('../views/AdminPage/RevenueManage', { StuMoney: StuMoney, RevPerMon: RevPerMon });
});

router.get('/admin/CourseManage', async (req, res) => {
    const NumofSub = await model.CountSubscibersAllCourses();
    const TopRatCo = await model.TOP6RatingCourse();
    res.render('../views/AdminPage/CourseManage', { NumofSub: NumofSub, TopRatCo: TopRatCo });
});

router.get('/admin/CustomerManage', async (req, res) => {
    const AllStu = await model.GetAllStudent();
    const MonthMana = await model.ManageEnrollByMonth();
    res.render('../views/AdminPage/CustomerManage', { AllStu: AllStu, MonMana: MonthMana });
});

router.get('/Cart/paypal/success/:idcart/:money', async (req, res) => {
    const CheckUser = req.isAuthenticated();
    const IDcart = req.params.idcart;
    const money = parseInt(req.params.money);
    const IDbill = await model.GetBillIDTop1();
    var bi = parseInt(IDbill[0].ID);
    bi = bi + 1;
    var bill_id;
    if (bi < 10) {
        bill_id = "BI00" + bi;
    } else if (bi < 100 && bi >= 10) {
        bill_id = "BI0" + bi;
    } else {
        bill_id = "BI" + bi;
    }
    var biid = String(bill_id);
    var checkcart = await model.CheckCartExistsInBill(IDcart);
    if (checkcart[0].dem == 0) {  //Kiểm tra giỏ hàng đã thanh toán trước đó chưa.
        await model.InsertBill(biid, IDcart, money);
        await model.UpadeCart_Paystatus(IDcart, money);
        console.log('Thanh toán thành công ID bill: ' + biid);
        res.render('../views/PaypalPay/Success.hbs', { CheckUser });
    } else res.render('../views/PaypalPay/Error.hbs', { CheckUser });
});

module.exports = router;