const c = require("colors");
const fs = require("fs");
const log = console.log;

const succ = c.green.bold("✔");
const fail = c.red.bold("✖");
const main = c.magenta;
const bg = c.black.bgWhite;

module.exports = envName => {
	if ( !require("./checkcwd")() ) return;
	
	const envsList = Object.keys( require("./parseConfig")().envs );
	let p = "./.kart/env";
	if (envName) {
		if ( envsList.indexOf(envName) !== -1 ) {
			fs.writeFileSync(p, envName);
			log( succ, main("Switched to:"), bg(` ${envName} `), main("environment.") );
		} else {
			log( fail, main("Unknown environment:"), c.yellow(envName), c.cyan("\n Available options:"), `\n [${envsList.join(" | ")}]`  );
		}
	} else {
		const v = fs.readFileSync(p, "utf8");
		log( main("Current environment:"), bg(` ${v} `) );
		return ""+v;
	}
};