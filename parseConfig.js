const fs = require("fs-extra");
const c = require("colors/safe");

const CONFIG_FILE = "./.kart/config.js";
module.exports = () => {
	let content = fs.readFileSync(CONFIG_FILE, "utf8");
	let wrap = "("+ content +")";
	return eval(wrap);
};