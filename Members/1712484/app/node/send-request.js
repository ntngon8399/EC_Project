const cheerio = require("cheerio");
const request = require("request");

Data = require("./data");

const tiki =
  "https://tiki.vn/dien-thoai-may-tinh-bang/c1789?src=c.1789.hamburger_menu_fly_out_banner&_lc=Vk4wMzkwMjQwMDg%3D";

urlList = [];

list = [
  "https://tiki.vn/dien-thoai-samsung-galaxy-note-10-plus-256gb-12gb-hang-chinh-hang-da-kich-hoat-bao-hanh-dien-tu-p29454689.html?src=category-page-1789&2hi=0",
  "https://tiki.vn/dien-thoai-samsung-galaxy-a01-16gb-2gb-hang-chinh-hang-da-kich-hoat-bao-hanh-dien-tu-p50300292.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-iphone-7-plus-128gb-hang-nhap-khau-chinh-hang-p269707.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-samsung-galaxy-m30s-64gb-4gb-hang-chinh-hang-p33136984.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-vsmart-star-hang-chinh-hang-p31322859.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-vsmart-joy-2-hang-chinh-hang-p32453719.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-vsmart-live-64gb-6gb-hang-chinh-hang-p27927726.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-vsmart-bee-1gb-16gb-hang-chinh-hang-p26021642.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-samsung-galaxy-a20s-hang-chinh-hang-p35843180.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-vsmart-joy-3-hang-chinh-hang-p48524359.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-samsung-galaxy-a51-128gb-6gb-hang-chinh-hang-p45339109.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-samsung-galaxy-a01-16gb-2gb-hang-chinh-hang-p48307567.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-xiaomi-mi-9-lite-mi-cc9-global-version-6gb-64gb-hang-chinh-hang-p34928767.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-realme-3-pro-128gb-6gb-hang-chinh-hang-p20319214.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-vsmart-active-3-6gb-64gb-hang-chinh-hang-p46753117.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-samsung-galaxy-a10s-32gb-2gb-hang-chinh-hang-p25918805.html?src=category-page-1789&2hi=0",
  "https://tiki.vn/dien-thoai-xiaomi-redmi-8a-2gb-32gb-hang-chinh-hang-p35770986.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-xiaomi-redmi-7a-2gb-16gb-hang-chinh-hang-p23590831.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-nokia-105-single-sim-2019-hang-chinh-hang-p34942696.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-iphone-11-pro-max-64gb-hang-chinh-hang-p32028822.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-nokia-105-dual-sim-2019-hang-chinh-hang-p25730627.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-xiaomi-redmi-note-8-hang-chinh-hang-p35773440.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-samsung-galaxy-a50s-64gb-4gb-hang-chinh-hang-da-kich-hoat-bao-hanh-dien-tu-p32243658.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-iphone-11-64gb-hang-chinh-hang-p32033717.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-nokia-2-2-16gb-2gb-hang-chinh-hang-p20913598.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-nokia-6-1-plus-hang-chinh-hang-p3873909.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-oppo-a5s-hang-chinh-hang-p15674844.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-oppo-f11-hang-chinh-hang-p11588693.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-nokia-3-1-16gb-2gb-hang-chinh-hang-p3021869.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-nokia-7-2-hang-chinh-hang-p32648392.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-samsung-galaxy-a10s-32gb-2gb-hang-chinh-hang-da-kich-hoat-bao-hanh-dien-tu-p29396058.html?src=category-page-1789&2hi=0",
  "https://tiki.vn/dien-thoai-samsung-galaxy-s10-plus-128gb-8gb-hang-chinh-hang-da-kich-hoat-bao-hanh-dien-tu-p12206824.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-nokia-216-hang-chinh-hang-p290641.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-smartphone-masstel-x6-hang-chinh-hang-p9984235.html?src=category-page-1789&2hi=0",
  "https://tiki.vn/dien-thoai-samsung-galaxy-a50s-64gb-4gb-hang-chinh-hang-p29964500.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-oppo-a5-2020-64gb-3gb-hang-chinh-hang-p42704545.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-vivo-y15-4gb-64gb-hang-chinh-hang-p16256385.html?src=category-page-1789&2hi=0",
  "https://tiki.vn/dien-thoai-iphone-11-128gb-hang-chinh-hang-p32033730.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-samsung-galaxy-note-10-lite-128gb-8gb-hang-chinh-hang-p48290403.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-masstel-izi-100-hang-chinh-hang-p2130371.html?src=category-page-1789&2hi=1",
  "https://tiki.vn/dien-thoai-xiaomi-redmi-note-7-3gb-32gb-hang-chinh-hang-p10596796.html?src=category-page-1789&2hi=0"
];

Data = require("./data");
product = new Data(
  "https://tiki.vn/dien-thoai-xiaomi-redmi-note-7-3gb-32gb-hang-chinh-hang-p10596796.html?src=category-page-1789&2hi=0"
);
setTimeout(() => {
  product.toString();
}, 3000);

// function getUrlList() {
//   // result = [];
//   request.get(tiki, (error, res, html) => {
//     if (!error && res.statusCode === 200) {
//       const $ = cheerio.load(html);
//       $(".product-item a").each((i, tag) => {
//         const href = $(tag).attr("href");
//         if (href.includes("https://tiki.vn/dien-thoai")) urlList.push(href);
//       });
//     }
//     // return result;
//   });
// }

// getUrlList();

// list.forEach(link => {
//   data = new Data(link);
//   request.post(
//     {
//       url: "http://localhost:3000/add-product",
//       json: true,
//       body: {
//         name: data.name,
//         price: data.price,
//         img: data.img,
//         category: data.category,
//         des: data.des
//       }
//     },
//     (error, res, html) => {
//       if (!error && res.statusCode === 200) {
//         console.log(body);
//       }
//     }
//   );
// });
