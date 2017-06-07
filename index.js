#!/usr/bin/env node
const path = require("path");
const fs = require("fs-extra");
const c = require("colors/safe");
const shell = require("shelljs");
const m = require("commander");
const u = require("util-ma");
const DS = path.sep;
const DL = path.delimiter;
const log = console.log;
const d = __dirname + DS;
let conf;

const r = " --color";
const commands = {};
c["html"]    = "gulp html"+r;
c["sass"]    = "gulp sass"+r;
c["temp"]    = "gulp temp"+r;
c["js"]      = "gulp js"+r;
c["html-w"]  = "gulp html-w"+r;
c["sass-w"]  = "gulp sass-w"+r;
c["temp-w"]  = "gulp temp-w"+r;
c["js-w"]    = "gulp js-w"+r;
c["compile"] = "gulp all"+r;
c["live"]    = "gulp livereload"+r;

const env = require("./env");
const liber = require("./liberate");
const checkCwd = require("./checkcwd");

if ( checkCwd() ) {
	conf = require("./parseConfig")();
	require("./commandGenerator")(conf);
}
debugger

m.usage("command [options]");
m.version(""+ JSON.parse(fs.readFileSync(d+"package.json", "utf8")).version, "-v, --version");

m.command("init").description("Initialize project skeleton.").action(()=> {
	if ( !checkCwd(true) ) return;
	require("./init")();
});
m.command("html").description("Compile HTML.").action(run);
m.command("sass").description("Compile Sass.").action(run);
m.command("temp").description("Compile dynamic templates.").action(run);
m.command("js").description("Compile JavaScript.").action(run);
m.command("html-w").description("Watch HTML.").action(run);
m.command("sass-w").description("Watch Sass.").action(run);
m.command("temp-w").description("Watch dynamic templates.").action(run);
m.command("js-w").description("Watch JavaScript").action(run);
m.command("compile").description("Compile everything.").action(run);
m.command("live").description("Enable livereload for: dist/index.html, dist/css and dist/js").action(run);

m.command("env [name]").description("Show current environment, or change it.").action( env );
m.command("lib [which]").description("Build lib based on current environment.").action( which => liber(which) );
m.command("libs").description("Build all libs.").action(libs);
m.command("build [env]").description("Build libs and compile. You can specify another env.").action( env => build(env) );
m.command("release").description("Custom release.").action(release);
m.command("release-hard").description("Build and compile release-hard.").action(releaseHard);

m.parse(process.argv);
m.args.length || m.help();



function run(cmd) {
	if ( !checkCwd() ) return;
	
	let t = u.isObj(cmd) ? commands[cmd._name] : u.isStr(cmd) ? commands[cmd] : undefined;
	if (!t) return;
	shell.env.PATH += DL+"./node_modules/.bin";
	shell.exec(t).code !== 0 ?
		log( c.red.bold("Shell exec failed!") ) : undefined;
}
function libs() {
	if ( !checkCwd() ) return;
	
	liber("css");
	liber("js");
}
function build(anotherEnv) {
	if ( !checkCwd() ) return;
	
	if (anotherEnv) {
		env(anotherEnv);
	}
	libs();
	run("compile");
}
function releaseHard() {
	if (!checkCwd()) return;
	
	build("release-light");
	require("./release-hard");
}
function release() {
	if (!checkCwd()) return;
	
	build("debug-normal");
	require("./release")();
}
