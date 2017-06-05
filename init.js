const fs = require("fs-extra");
const c = require("colors/safe");
const log = console.log;

const dir = "./.kart/";
const ignores = [
	"node_modules/",
	".sass-cache/",
	"release/*",
	"dist/css/*",
	"dist/js/*",
	"dist/index.html",
	"src/lib/*/"
];

function isInit() {
	return fs.existsSync(dir);
}

function init() {
	fs.ensureDirSync(dir);
	fs.copySync("./node_modules/kart/skeleton/", "./", {overwrite: false});
	fs.writeFileSync("./.kart/init", "1", "uff8");
	fs.writeFileSync("./.gitignore", ignores.join("\n"), "utf8");
}

module.exports = () => {
	log( c.magenta("Initializing project skeleton...") );
	
	if ( isInit() ) {
		log("\n", c.red.bold("✖"), c.yellow("Already initialized.") );
	} else {
		init();
		log("\n", c.green.bold("✔"), c.green("Successfuly initialized!") );
	}
};