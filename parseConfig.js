const fs = require("fs-extra");
module.exports = () => {
	let content = fs.readFileSync("./.kart/config.js", "utf8");
	let wrap = "("+ content +")";
	let res = eval(wrap);
	return res;
};