const controllers = require("../controllers/users");
const router = require("express").Router();

// CRUD Routes /users

/**
 * Get all users
 * @route GET /users
 * @access Public
 * @param {Request}
 * @route GET /users
 *
 * Headers: none required
 * Body: none required
 *
 * @param {Response}
 * @returns {Array} all users
 * @returns {Error} 404 - User not found
 * @returns {Error} 500 - Server error
 */

router.get("/", controllers.getUsers);

/**
 * Get a single user
 * @access Public
 * @route GET /users/:userId
 *
 * @param {Request}
 * Headers: none required
 * Body: none required
 *
 * @param {Response}
 * @returns {Object} 200 -user
 * @returns {Error} 404 - User not found
 * @returns {Error} 500 - Server error
 */
router.get("/:userId", controllers.getUser);

/**
 * Create a new user
 * @access Public
 * @route POST /users
 *
 * @param {Request}
 * Headers: none required
 * Body: JSON { name: string, email: string }
 *
 * @param {Response}
 * @returns {Object} 200 - user & success message
 * @returns {Error} 400 - Name or email is required
 * @returns {Error} 500 - Server error
 */
router.post("/", controllers.createUser);

/**
 * Update a user
 * @access Public
 * @route PUT /users/:userId
 *
 * @param {Request}
 * Headers: none required
 * Body: JSON { name?: string, email?: string }
 *
 * @param {Response}
 * @returns {Object} 200 - user & success message
 * @returns {Error} 400 - Name or email is required
 * @returns {Error} 404 - User not found
 * @returns {Error} 500 - Server error
 */
router.put("/:userId", controllers.updateUser);

/**
 * Delete a user
 * @access Public
 * @route DELETE /users/:userId
 *
 * @param {Request}
 * Headers: none required
 * Body: none required
 *
 * @param {Response}
 * @returns {Object} 200 - user & success message
 * @returns {Error} 404 - User not found
 * @returns {Error} 500 - Server error
 */
router.delete("/:userId", controllers.deleteUser);

module.exports = router;
