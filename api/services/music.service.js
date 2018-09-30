const { MoleculerClientError } = require("moleculer").Errors;
const { Service } = require("moleculer");

const DbService = require("../mixins/db.mixin");

module.exports = (broker) => {
	return new Service(broker, {
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
			party: {
				async handler(ctx) {
          console.log('HELLO');
          console.log(ctx);
				}
			},
    },
		/**
		 * Methods
		 */
		methods: {},

		events: {}
	});
};
