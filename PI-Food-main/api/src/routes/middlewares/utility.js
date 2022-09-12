const fs = require("fs");
function validatePost(body) {
  if (!body.name || !body.summary) return true;
  else return false;
}

function searchByName(name) {
  // const data = fetch(
  //   "https://run.mocky.io/v3/64dfef83-658b-47e0-a079-8e106c0bc34a"
  // ).then((response) => response.json);
  const rawdata = fs.readFileSync("../../../db/api.json");
  var data = JSON.parse(rawdata);
  data = data.results;
  const param = name.toLowerCase(name);
  const match = data.filter((item) => {
    return item.title.toLowerCase().includes(param);
  });
  console.log(match);
  return match;
}

searchByName("rice");

module.exports = { validatePost, searchByName };
