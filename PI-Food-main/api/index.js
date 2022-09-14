//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { sequelize } = require("./src/db");
require("./src/models/Diet");
require("./src/models/Recipe");
require("./src/models/Recipe_Diet");

const PORT = 3000;
// Syncing all the models at once.
// conn.sync({ force: false }).then(() => {
//   server.listen(3001, () => {
//     console.log("%s listening at 3001"); // eslint-disable-line no-console
//   });
// });
async function main() {
  try {
    await sequelize.sync({ force: false });
    server.listen(PORT);
    console.log("Server listening in port", PORT);
  } catch (error) {
    console.error("Unable to connect to the database", error);
  }
}

main();
