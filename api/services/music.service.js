const { MoleculerClientError } = require("moleculer").Errors;

const axios = require("axios");
const DbService = require("../mixins/db.mixin");

module.exports = {
    name: "music",
    mixins: [
      DbService("music"),
    ],

		/**
		 * Default settings
		 */
		settings: {
			/** Secret for JWT */
			JWT_SECRET: process.env.JWT_SECRET || "jwt-secret",
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
			createMusicPlaylist: {
				params: {
					userID: { type: "string" },
					longitude: { type: "string" },
					latitude: { type: "string" }
				},
				async handler(ctx) {
					try {
						const user = await ctx.call('users.profile', { _id: ctx.params.userID })
						const reverseGeoCoding = await axios.get(`https://eu1.locationiq.com/v1/reverse.php?key=70ccc94a33b55b&lat=${ctx.params.latitude}&lon=${ctx.params.longitude}&format=json`);
						if (reverseGeoCoding.data) {
							console.log(reverseGeoCoding.data.address);
						}
					} catch(e) {
						return this.Promise.reject(new MoleculerClientError(e.message, e.code, e.type, e.data));
					}
				}
			},
    },
		/**
		 * Methods
		 */
		methods: {},

		events: {}
};
