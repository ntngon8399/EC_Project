const https = require("https");
urlStr =
"https://tiki.vn/dien-thoai-iphone-6-32gb-vn-a-vang-dong-hang-chinh-hang-p684632.html?src=category-page-1789&2hi=0&_lc=Vk4wMzkwMjQwMDg%3D"

https
  .get(urlStr, res => {
    let data = "";
    ogtitle = '<meta property="og:title" content="';
    ogdes = '<meta property="og:description" content="';
    ogurl = '<meta property="og:image" content="';
    ogend = '" />';
    costs = '<span id="span-price">';
    coste = "</span>";

    const result = { name: "", des: "", price: "" };
    //   A chunk of data has been recieved.
    res.on("data", chunk => {
      data += chunk;
      if (data.indexOf(ogtitle) != -1) {
        name = parseString(data, ogtitle, ogend);
        // console.log('{"name": "' + name + '",');
        console.log(name);
        result.name = name;
      }
      if (data.indexOf(ogdes) != -1) {
        des = parseString(data, ogdes, ogend);
        // console.log('"description": "' + des + '",');
        console.log(des);
        result.des = des;
      }
      if (data.indexOf(ogurl, ogend) != -1) {
        image = parseString(data, ogurl, ogend);
        // console.log('"image": "' + image + '",');
        console.log(image);
      }
      if (data.indexOf(costs) != -1) {
        price = parseString(data, costs, coste);
        // console.log('"price": "' + price + '", "brand": ""}');
        console.log(price);
        result.price = price;
      }
      data = "";
    });

    // The whole response has been received. Print out the result.
    //   res.on("end", () => {
    //     console.log(JSON.parse(data).explanation);
    //   });
  })
  .on("error", err => {
    console.log("Error: " + err.message);
  });

function parseString(data, startStr, endStr) {
  startIndex = data.indexOf(startStr);
  data = data.substring(startIndex);
  endIndex = data.indexOf(endStr);
  str = data.substring(startStr.length, endIndex);
  return str;
}

// if (data.indexOf(ogdes) != -1){
//     des = parseString(data, ogdes, ogend);
// }
// if (data.indexOf(costs) != -1){
//     cost = parseString(data, costs, coste);
// }
