const { MoleculerClientError } = require("moleculer").Errors;
const { Service } = require("moleculer");

//const crypto 		= require("crypto");
const bcrypt 		= require("bcrypt");
const jwt 			= require("jsonwebtoken");

const DbService = require("../mixins/db.mixin");
const CacheCleanerMixin = require("../mixins/cache.cleaner.mixin");

module.exports = {
		name: "users",
		mixins: [
			DbService("users"),
			CacheCleanerMixin([
				"cache.clean.users",
				"cache.clean.follows",
			])
		],

		/**
		 * Default settings
		 */
		settings: {
			/** Secret for JWT */
			JWT_SECRET: process.env.JWT_SECRET || "jwt-secret",

			/** Public fields */
			fields: ["_id", "firstname", "lastname", "email", "bio", "image"],

			/** Validator schema for entity */
			entityValidator: {
				firstname: { type: "string"},
				lastname: { type: "string"},
				email: { type: "email" },
				password: { type: "string", min: 6 },
				bio: { type: "string", optional: true },
				image: { type: "string", optional: true },
			}
		},

		/**
		 * Actions
		 */
		actions: {
			/**
			 * Register a new user
			 *
			 * @actions
			 * @param {Object} user - User entity
			 *
			 * @returns {Object} Created entity & token
			 */
			create: {
				params: {
					user: { type: "object" }
				},
				async handler(ctx) {
					let entity = ctx.params.user;
					await this.validateEntity(entity);
					if (entity.email) {
						const found = await this.adapter.findOne({ email: entity.email });
						if (found)
							return Promise.reject(
								new MoleculerClientError("Email exists!", 422, "Email exists!", [{ field: "email", message: "Email exists"}])
							);
					}
					entity.password = bcrypt.hashSync(entity.password, 10);
					entity.bio = entity.bio || "";
					entity.image = entity.image || null;
					entity.createdAt = new Date();

					const doc = await this.adapter.insert(entity);
					const user = await this.transformDocuments(ctx, {}, doc);
					const json = await this.transformEntity(user, true, ctx.meta.token);
					return this.entityChanged("created", json, ctx).then(() => json);
				}
			},

			/**
			 * Login with username & password
			 *
			 * @actions
			 * @param {Object} user - User credentials
			 *
			 * @returns {Object} Logged in user with token
			 */
			login: {
				params: {
					user: { type: "object", props: {
						email: { type: "email" },
						password: { type: "string", min: 1 }
					}}
				},
				async handler(ctx) {
					const { email, password } = ctx.params.user;
					const user = await this.adapter.findOne({ email });

					if (!user) {
						return this.Promise.reject(new MoleculerClientError(
							"Email or password is invalid!",
							422,
							"",
							[{ field: "email", message: "is not found"}])
						);
					}

					const isPasswordCorrect = await bcrypt.compare(password, user.password);
					if (!isPasswordCorrect) {
						return Promise.reject(new MoleculerClientError(
							"Wrong password!", 422, "", [{ field: "email", message: "is not found"}]));
					}

					// Transform user entity (remove password and all protected fields)
					const transformedEntity = await this.transformDocuments(ctx, {}, user);
					return this.transformEntity(transformedEntity, true, ctx.meta.token);
				}
			},

			/**
			 * Get user by JWT token (for API GW authentication)
			 *
			 * @actions
			 * @param {String} token - JWT token
			 *
			 * @returns {Object} Resolved user
			 */
			resolveToken: {
				cache: {
					keys: ["token"],
					ttl: 60 * 60 // 1 hour
				},
				params: {
					token: "string"
				},
				handler(ctx) {
					return new this.Promise((resolve, reject) => {
						jwt.verify(ctx.params.token, this.settings.JWT_SECRET, (err, decoded) => {
							if (err)
								return reject(err);

							resolve(decoded);
						});

					})
						.then(decoded => {
							if (decoded.id)
								return this.getById(decoded.id);
						});
				}
			},

			/**
			 * Get current user entity.
			 * Auth is required!
			 *
			 * @actions
			 *
			 * @returns {Object} User entity
			 */
			me: {
				auth: "required",
				cache: {
					keys: ["#userID"]
				},
				handler(ctx) {
					return this.getById(ctx.meta.user._id)
						.then(user => {
							if (!user)
								return this.Promise.reject(new MoleculerClientError("User not found!", 400));

							return this.transformDocuments(ctx, {}, user);
						})
						.then(user => this.transformEntity(user, true, ctx.meta.token));
				}
			},

			/**
			 * Update current user entity.
			 * Auth is required!
			 *
			 * @actions
			 *
			 * @param {Object} user - Modified fields
			 * @returns {Object} User entity
			 */
			updateMyself: {
				auth: "required",
				params: {
					user: { type: "object", props: {
						username: { type: "string", min: 2, optional: true, pattern: /^[a-zA-Z0-9]+$/ },
						password: { type: "string", min: 6, optional: true },
						email: { type: "email", optional: true },
						bio: { type: "string", optional: true },
						image: { type: "string", optional: true },
					}}
				},
				handler(ctx) {
					const newData = ctx.params.user;
					return this.Promise.resolve()
						.then(() => {
							if (newData.username)
								return this.adapter.findOne({ username: newData.username })
									.then(found => {
										if (found && found._id.toString() !== ctx.meta.user._id.toString())
											return Promise.reject(new MoleculerClientError("Username is exist!", 422, "", [{ field: "username", message: "is exist"}]));

									});
						})
						.then(() => {
							if (newData.email)
								return this.adapter.findOne({ email: newData.email })
									.then(found => {
										if (found && found._id.toString() !== ctx.meta.user._id.toString())
											return Promise.reject(new MoleculerClientError("Email is exist!", 422, "", [{ field: "email", message: "is exist"}]));
									});

						})
						.then(() => {
							newData.updatedAt = new Date();
							const update = {
								"$set": newData
							};
							return this.adapter.updateById(ctx.meta.user._id, update);
						})
						.then(doc => this.transformDocuments(ctx, {}, doc))
						.then(user => this.transformEntity(user, true, ctx.meta.token))
						.then(json => this.entityChanged("updated", json, ctx).then(() => json));

				}
			},

			/**
			 * Get a user profile.
			 *
			 * @actions
			 *
			 * @param {String} username - Username
			 * @returns {Object} User entity
			 */
			profile: {
				cache: {
					keys: ["#userID", "username"]
				},
				params: {
					_id: { type: "string" }
				},
				async handler(ctx) {
					const user = await this.adapter.findOne({ _id: ctx.params._id });
					if (!user)
						return this.Promise.reject(new MoleculerClientError("User not found!", 404));

					return this.transformDocuments(ctx, {}, user);

				}
			},

			/**
			 * Follow a user
			 * Auth is required!
			 *
			 * @actions
			 *
			 * @param {String} username - Followed username
			 * @returns {Object} Current user entity
			 */
			follow: {
				auth: "required",
				params: {
					username: { type: "string" }
				},
				handler(ctx) {
					return this.adapter.findOne({ username: ctx.params.username })
						.then(user => {
							if (!user)
								return this.Promise.reject(new MoleculerClientError("User not found!", 404));

							return ctx.call("follows.add", { user: ctx.meta.user._id.toString(), follow: user._id.toString() })
								.then(() => this.transformDocuments(ctx, {}, user));
						})
						.then(user => this.transformProfile(ctx, user, ctx.meta.user));
				}
			},

			/**
			 * Unfollow a user
			 * Auth is required!
			 *
			 * @actions
			 *
			 * @param {String} username - Unfollowed username
			 * @returns {Object} Current user entity
			 */
			unfollow: {
				auth: "required",
				params: {
					username: { type: "string" }
				},
				handler(ctx) {
					return this.adapter.findOne({ username: ctx.params.username })
						.then(user => {
							if (!user)
								return this.Promise.reject(new MoleculerClientError("User not found!", 404));

							return ctx.call("follows.delete", { user: ctx.meta.user._id.toString(), follow: user._id.toString() })
								.then(() => this.transformDocuments(ctx, {}, user));
						})
						.then(user => this.transformProfile(ctx, user, ctx.meta.user));
				}
			}
		},

		/**
		 * Methods
		 */
		methods: {
			/**
			 * Generate a JWT token from user entity
			 *
			 * @param {Object} user
			 */
			generateJWT(user) {
				const today = new Date();
				const exp = new Date(today);
				exp.setDate(today.getDate() + 60);

				return jwt.sign({
					id: user._id,
					username: user.username,
					exp: Math.floor(exp.getTime() / 1000)
				}, this.settings.JWT_SECRET);
			},

			/**
			 * Transform returned user entity. Generate JWT token if neccessary.
			 *
			 * @param {Object} user
			 * @param {Boolean} withToken
			 */
			transformEntity(user, withToken, token) {
				if (user) {
					//user.image = user.image || "https://www.gravatar.com/avatar/" + crypto.createHash("md5").update(user.email).digest("hex") + "?d=robohash";
					user.image = user.image || "";
					if (withToken)
						user.token = token || this.generateJWT(user);
				}

				return { user };
			},

			/**
			 * Transform returned user entity as profile.
			 *
			 * @param {Context} ctx
			 * @param {Object} user
			 * @param {Object?} loggedInUser
			 */
			transformProfile(ctx, user, loggedInUser) {
				//user.image = user.image || "https://www.gravatar.com/avatar/" + crypto.createHash("md5").update(user.email).digest("hex") + "?d=robohash";
				user.image = user.image || "https://static.productionready.io/images/smiley-cyrus.jpg";

				if (loggedInUser) {
					return ctx.call("follows.has", { user: loggedInUser._id.toString(), follow: user._id.toString() })
						.then(res => {
							user.following = res;
							return { profile: user };
						});
				}

				user.following = false;

				return { profile: user };
			}
		},

		events: {
			"cache.clean.users"() {
				if (this.broker.cacher)
					this.broker.cacher.clean(`${this.name}.*`);
			},
			"cache.clean.follows"() {
				if (this.broker.cacher)
					this.broker.cacher.clean(`${this.name}.*`);
			}
		}
};
