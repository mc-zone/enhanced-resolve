/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

module.exports = class CaseInsensitivePlugin {
	constructor(source) {
		this.source = source;
	}

	apply(resolver) {
		const fs = resolver.fileSystem;
		if(!fs.readRealpath) return ;
		resolver.getHook(this.source).tapAsync("CaseSensitivePlugin", (request, resolveContext, callback) => {
			const filepath = request.path;
			fs.readRealpath(filepath, (err, realpath) => {
				if(err || !realpath) {
					if(resolveContext.log) resolveContext.log("read realpath " + filepath + " failed.");
					return callback();
				}
				if(realpath !== filepath) {
					if(resolveContext.log) {
						resolveContext.log("you may be using a wrong file/dir path with case-insensitive " +
						filepath + " which actually is " + realpath);
					}
				}
				return callback();
			});
		});
	}
};

