const User = require("../models/user");

// CRUD Controllers

// get all users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users: users });
  } catch (error) {
    next(error);
  }
};

// get a single user
exports.getUser = async (req, res, next) => {
  const uid = req.params.userId;

  try {
    const user = await User.findByPk(uid);

    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      err.message = { message: "User not found" };
      next(err);
    }

    res.status(200).json({ user: user });
  } catch (error) {
    next(error);
  }
};

// create a new user
exports.createUser = async (req, res, next) => {
  const { name, email } = req.body;

  try {
    const user = await User.create({
      name: name,
      email: email,
    });

    res.status(201).json({ user: user, message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

// update a user
exports.updateUser = async (req, res, next) => {
  const uid = req.params.userId;
  const { name, email } = req.body;

  const options = {};

  if (name === undefined && email === undefined) {
    const err = new Error("Name or email is required");
    err.status = 400;
    err.message = { message: "Name or email is required" };
    next(err);
  }

  try {
    const existingUser = await User.findByPk(uid);

    if (!existingUser) {
      const err = new Error("User not found");
      err.status = 404;
      err.message = { message: "User not found" };
      next(err);
    }

    options.name = name ?? existingUser.name;
    options.email = email ?? existingUser.email;

    await existingUser.update({
      name: options.name,
      email: options.email,
    });

    existingUser.save();
    res.status(200).json({ user: existingUser, message: "User updated" });
  } catch (error) {
    next(error);
  }
};

// delete a user
exports.deleteUser = async (req, res, next) => {
  const uid = req.params.userId;

  try {
    const existingUser = await User.findByPk(uid);

    if (!existingUser) {
      const err = new Error("User not found");
      err.status = 404;
      err.message = { message: "User not found" };
      next(err);
    }

    await existingUser.destroy();
    res
      .status(200)
      .json({ message: "User deleted", userDetails: existingUser });
  } catch (error) {
    next(error);
  }
};
