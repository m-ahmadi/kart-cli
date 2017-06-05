const fs = require("fs-extra");
const c  = require("colors/safe");

function isInit() {
	return fs.existsSync("./.kart") && fs.existsSync("./.kart/init");
}
function isNpm() {
	return fs.existsSync("./package.json");
}
function isSway() {
	if ( fs.existsSync("./node_modules") ) {
		let r = fs.readdirSync("./node_modules/");
		if (fs.existsSync("./node_modules/kart") &&
			r.length &&
			r.length >= 18) {
			return true;
		}
	}
	return false;
}	

const c1 = s => { return c.red.bold(s) };
const c2 = s => { return c.white.bold(s) };
const c3 = s => { return c.cyan(s) };

module.exports = skip => {
	let cond = skip
		? isNpm()  &&  isSway()
		: isNpm()  &&  isSway()  &&  isInit();
	
	if (cond) {
		return true;
	} else {
		let m = "";
		isNpm()  ? "" : m+= c1("\t✖ ") + c2("package.json ")        + c3("        npm init -f\n");
		isSway() ? "" : m+= c1("\t✖ ") + c2("local dependencies ")  + c3("  npm install m-ahmadi/kart --save\n");
		isInit() ? "" : m+= c1("\t✖ ") + c2("project initialized ") + c3(" kart init");
		console.log(m);
		return false;
	}
};