const conf = {};	// config object
const i = {};		// formatted input
const o = {};		// formatted output
let env;			// current environment object
let sas, nsas;		// temporary commands
let html, sass, temp, js; // commands


"debug-hard": {
	css: {
		lib: {
			path: "lib/",
			cat: false,
			min: false
		},
		app: {
			path: "style.css",
			min: false,
			sasmap: true
		}
	},
	js: {
		lib: {
			path: "lib/",
			cat: false,
			min: false
		},
		app: {
			path: "main.js",
			one: false,
			min: false
		}
	}
},
function mkHtml() {
	return `htmlbilder ${i.html.path} -o ${o.html} ${conf.input.html.options}`;
}
function mkSas() {
	let app = env.css.app;
	let c = `sass ${i.sass}:${o.css}${app.path}`;
	c += app.min    ? " --style compressed" : " --style expanded";
	c += app.sasmap ? " --sourcemap=auto"   : " --sourcemap=none";
	return c;
}
function mkNsas() {
	let app = env.css.app;
	let c = `node-sass ${i.sass} > ${o.css}${app.path}`;
	c += app.min    ? " --output-style compressed" : " --output-style expanded --indent-type tab --indent-width 1";
	c += app.sasmap ? " --sourcemap"               : "";
	return c;
}
function mkTemp() {
	let app = env.js.app;
	let c = `handlebars ${i.temp} -f ${o.temp} ${conf.input.temp.options}`;
	if (app.one) {
		c = mkJs() + `&& ${c}`;
	}
	return c;
}
function mkJs() {
	let app = env.js.app;
	let c = `babel ${i.js} -d ${o.js} -s`;
	C.js += " --minified";
	
	
	let rconf = JSON.parse( fs.readFileSync(RCONF, "utf8") );
	rconf.baseUrl = I.JS;
	rconf.out = O.APP;
	rconf.optimize = "none";
	fs.writeFileSync(RCONF, JSON.stringify(rconf, null, 4), "utf8");
	
	C.js = `r_js -o ${RCONF} && babel ${I.JS} -o ${O.APP} -s --minified --no-comments`;
}
function start() {
	sas    = `sass ${i.sass}:${o.css}/env.css.app.path`;
	nsas   = `node-sass ${i.sass} > ${o.css}`;
	C.html = `htmlbilder ${i.html.path} -o ${o.html} ${conf.input.html.options}`;
	C.temp = `handlebars ${i.temp} -f ${i.temp} -e hbs -m`;
	C.js   = `babel ${i.js} -d ${o.js} -s`;
}

if (css.app.path) {

}
const RJS = "node node_modules/requirejs/bin/r.js";
const RCONF = "./rconfig.js"
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
	
	C.js = `r_js -o ${RCONF} && babel ${I.JS} -o ${O.APP} -s --minified --no-comments`;
	
	O.TEMP  = I.JS + F.TEMP;
	C.temp  = `handlebars ${I.TEMP} -f ${O.TEMP} -e hbs -m`;
} else if (env === RELEASE_HARD) {
	
}

if (shell.exec("sass -v", {silent: true}).code !== 0) { // no sass
	C.sass = nsas;
} else {
	C.sass = sas;
}

cmd.w = {};
cmd.w.html = html + " -w";
cmd.w.sass = sas    + " --watch";
cmd.w.js   = js   + " -w";

cmd.all = `${cmd.html} && ${cmd.sass} && ${cmd.temp} && ${cmd.js}`;


function setup(o) {
	let a = o.input;
	let b = o.output;
	let r1 = a.root;
	let r2 = b.root;
	
	i.html = r1 + a.html.path;
	i.sass = r1 + a.sass;
	i.temp = r1 + a.temp.path;
	i.js   = r1 + a.js;
	
	o.html = r2 + b.html;
	o.sass = r2 + b.sass;
	o.js   = r2 + b.js;
}


module.exports = (config, currentEnv) => {
	conf = config;
	env = conf.envs[currentEnv];
	setup(conf);
	start();
};