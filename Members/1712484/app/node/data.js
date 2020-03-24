const cheerio = require("cheerio");
const request = require("request");

module.exports = class Data {
  constructor(url) {
    //   getData() {
    request(url, (error, res, html) => {
      if (!error && res.statusCode === 200) {
        const $ = cheerio.load(html);

        //Get name and category
        var items = [];
        $(".breadcrumb li").each((index, li) => {
          const item = $(li)
            .next()
            .text();
          if (item.length != 0) {
            items.push(item);
          }
        });
        this.name = items[items.length - 1];
        this.category = items[items.length - 2];

        // //Get price
        this.price = $("#span-price").text();

        // //Get top-feature-item bullet-wrap
        let feature = "";
        $(".top-feature-item p").each((i, p) => {
          let text = $(p)
            .text()
            .trim();
          feature += text + "\n";
        });
        this.des = feature;

        // //Get img
        this.img = $("#product-magiczoom").attr("src");
      }
    });
  }

  toString() {
    console.log(
      '{"name": "' +
        this.name +
        '"' +
        ', "category": "' +
        this.category +
        '"' +
        ', "price": "' +
        this.price +
        '"' +
        ', "des": "' +
        this.des +
        '"' +
        ', "img": "' +
        this.img +
        '" }'
    );
  }
};
