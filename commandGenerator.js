let conf;
const c = {};

"html": "htmlbilder ./src/html/ -o ./dist/index.html -t main.handlebars -e .htm",
"temp": "handlebars ./src/template/ -f ./dist/js/templates.js -e hbs -m",
"js": "babel ./src/js/ -d ./dist/js/ -s",
"sass": "sass ./src/sass/style.scss:./dist/css/style.css --style expanded --sourcemap=auto",
"w": {
	"html": "htmlbilder ./src/html/ -o ./dist/index.html -t main.handlebars -e .htm -w",
	"sass": "sass ./src/sass/style.scss:./dist/css/style.css --style expanded --sourcemap=auto --watch",
	"js": "babel ./src/js/ -d ./dist/js/ -s -w"
},




let sas  = `sass ${I.STYLE}:${O.STYLE}`;
let nsas = `node-sass ${I.STYLE} > ${O.STYLE}`;
C.html   = `htmlbilder ${I.HTML} -o ${O.HTML} -t ${ST} -e ${SD}`;
C.temp   = `handlebars ${I.TEMP} -f ${O.TEMP} -e hbs -m`;
C.js     = `babel ${I.JS} -d ${O.JS} -s`;

if (env === DEBUG_HARD) {
	sas  += " --style expanded --sourcemap=auto";
	nsas += " --output-style expanded --sourcemap --indent-type tab --indent-width 1";
} else if (env === DEBUG_NORMAL) {
	sas  += " --style expanded --sourcemap=auto";
	nsas += " --output-style expanded --sourcemap --indent-type tab --indent-width 1";
} else if (env === DEBUG_LIGHT) {
	sas  += " --style compressed --sourcemap=auto";
	nsas += " --output-style compressed --sourcemap";
	C.js += " --minified";
} else if (env === RELEASE_LIGHT) {
	sas  += " --style compressed --sourcemap=none";
	nsas += " --output-style compressed";
	
	let rconf = JSON.parse( fs.readFileSync(RCONF, "utf8") );
	rconf.baseUrl = I.JS;
	rconf.out = O.APP;
	rconf.optimize = "none";
	fs.writeFileSync(RCONF, JSON.stringify(rconf, null, 4), "utf8");
	
	C.js = `${RJS} -o ${RCONF} && babel ${I.JS} -o ${O.APP} -s --minified --no-comments`;
	
	O.TEMP  = I.JS + F.TEMP;
	C.temp  = `handlebars ${I.TEMP} -f ${O.TEMP} -e hbs -m`;
} else if (env === RELEASE_HARD) {
	
}

if (shell.exec("sass -v", {silent: true}).code !== 0) { // no sass
	C.sass = nsas;
} else {
	C.sass = sas;
}

C.w = {};
C.w.html = C.html + " -w";
C.w.sass = sas    + " --watch";
C.w.js   = C.js   + " -w";

C.all = `${C.html} && ${C.sass} && ${C.temp} && ${C.js}`;






function start() {
	
	
}

module.exports = o => {
	conf = o;
	start();
};