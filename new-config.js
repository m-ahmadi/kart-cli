{
	input: {
		root: "./src/",
		html: {path: "html/", options: "-t main.handlebars -e .htm"},
		sass: "sass/style.scss",
		temp: {path: "template/", options: "-e hbs -m"},
		js: "js/",
		lib: "lib/"
	},
	output: {
		root: "./dist/",
		css: "css/",
		js: "js/",
		html: "index.html"
	},
	envs: {
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
		"debug-normal": {
			css: {
				lib: {
					path: "libs.min.css",
					cat: true,
					min: {srcmap: true}
				},
				app: {
					path: "style.css",
					min: false,
					sasmap: true
				}
			},
			js: {
				lib: {
					path: "lib/libs.min.js",
					cat: true,
					min: {srcmap: true}
				},
				app: {
					path: "main.js",
					one: false,
					min: false
				}
			}
		},
		"debug-light": {
			css: {
				lib: {
					path: "libs.min.css",
					cat: true,
					min: {srcmap: true}
				},
				app: {
					path: "style.css",
					min: false,
					sasmap: true
				}
			},
			js: {
				lib: {
					path: "lib/libs.min.js",
					cat: true,
					min: {srcmap: true}
				},
				app: {
					path: "main.js",
					one: false,
					min: {srcmap: true}
				}
			}
		},
		"release-light": {
			css: {
				lib: {
					path: "libs.min.css",
					cat: true,
					min: {srcmap: false}
				},
				app: {
					path: "style.css",
					min: true,
					sasmap: true
				}
			},
			js: {
				lib: {
					path: "lib/libs.min.js",
					cat: true,
					min: {srcmap: true}
				},
				app: {
					path: "app.min.js",
					one: true,
					min: {srcmap: true}
				}
			}
		},
		"release-hard": {
			css: {
				lib: {
					path: "libs.min.css",
					cat: true,
					min: {srcmap: false}
				},
				app: {
					path: "style.min.css",
					min: true,
					sasmap: false
				},
				cat: true,
				path: "style.min.css"
			},
			js: {
				lib: {
					path: "lib/libs.min.js",
					cat: true,
					min: {srcmap: false}
				},
				app: {
					path: "app.min.js",
					one: true,
					min: {srcmap: false}
				},
				cat: true,
				path: "app.min.js"
			}
		}
	}
}