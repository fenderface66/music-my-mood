"use strict";

const ApiGateway = require("moleculer-web");
const _ = require("lodash");

module.exports = {
	name: "api",
	mixins: [ApiGateway],

	// More info about settings: https://moleculer.services/docs/0.13/moleculer-web.html
	settings: {
		port: process.env.PORT || 3000,
		// Set CORS headers
		//cors: true,
		aliases: {
			// Login
			"POST /users/login": "users.login",

			// Users
			"REST /users": "users",

			// Current user
			"GET /user": "users.me",
			"PUT /user": "users.updateMyself",
		},
		// Parse body content
		bodyParsers: {
			json: {
				strict: false
			},
			urlencoded: {
				extended: false
			}
		},
		routes: [{
			path: "/api",
			authorization: true,
		}],

		// Serve assets from "public" folder
		assets: {
			folder: "public"
		},
		onError(req, res, err) {
			// Return with the error as JSON object
			res.setHeader("Content-type", "application/json; charset=utf-8");
			res.writeHead(err.code || 500);

			if (err.code == 422) {
				let o = {};
				err.data.forEach(e => {
					let field = e.field.split(".").pop();
					o[field] = e.message;
				});

				res.end(JSON.stringify({ errors: o }, null, 2));
			} else {
				const errObj = _.pick(err, ["name", "message", "code", "type", "data"]);
				res.end(JSON.stringify(errObj, null, 2));
			}
			this.logResponse(req, res, err? err.ctx : null);
		},

	}
};
