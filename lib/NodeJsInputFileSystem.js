/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const fs = require("graceful-fs");

function NodeJsInputFileSystem() {}
module.exports = NodeJsInputFileSystem;

NodeJsInputFileSystem.prototype.stat = fs.stat.bind(fs);
NodeJsInputFileSystem.prototype.readdir = function readdir(path, callback) {
	fs.readdir(path, (err, files) => {
		callback(err, files && files.map(file => {
			return file.normalize ? file.normalize("NFC") : file;
		}));
	});
};
NodeJsInputFileSystem.prototype.readFile = fs.readFile.bind(fs);
NodeJsInputFileSystem.prototype.readlink = fs.readlink.bind(fs);
NodeJsInputFileSystem.prototype.realpath = fs.realpath.bind(fs);
if(fs.realpath.native) {
	NodeJsInputFileSystem.prototype.realpath.native = fs.realpath.native.bind(fs);
}

NodeJsInputFileSystem.prototype.statSync = fs.statSync.bind(fs);
NodeJsInputFileSystem.prototype.readdirSync = function readdirSync(path) {
	const files = fs.readdirSync(path);
	return files && files.map(file => {
		return file.normalize ? file.normalize("NFC") : file;
	});
};
NodeJsInputFileSystem.prototype.readFileSync = fs.readFileSync.bind(fs);
NodeJsInputFileSystem.prototype.readlinkSync = fs.readlinkSync.bind(fs);
NodeJsInputFileSystem.prototype.realpathSync = fs.realpathSync.bind(fs);
if(fs.realpathSync.native) {
	NodeJsInputFileSystem.prototype.realpathSync.native = fs.realpathSync.native.bind(fs);
}
