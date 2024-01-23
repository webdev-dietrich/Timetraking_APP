const db = require("../models");
const Users = db.users;
const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findByPk(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const registerUser = async (req, res) => {
  const { username, userpw, firstname, lastname } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(userpw, 10);
    const newUser = await Users.create({ username, userpw: hashedPassword, firstname, lastname });

    if (newUser.id && newUser.id === 1) {
      isAdmin = 1;
      await newUser.update({ is_admin: isAdmin });
    }

    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const updateUser = async (req, res) => {
  const { id, username, userpw, firstname, lastname, is_admin } = req.body;

  try {
    const userToUpdate = await Users.findByPk(id);

    if (!userToUpdate) {
      return res.status(404).send('User not found');
    }

    if (username) userToUpdate.username = username;
    if (userpw) {
      const hashedPassword = await bcrypt.hash(userpw, 10);
      userToUpdate.userpw = hashedPassword;
    }
    if (firstname) userToUpdate.firstname = firstname;
    if (lastname) userToUpdate.lastname = lastname;
    if (is_admin !== undefined) userToUpdate.is_admin = is_admin;

    await userToUpdate.save();

    res.json(userToUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const loginUser = async (req, res) => {
  const { username, userpw } = req.body;

  try {
    const user = await Users.findOne({ where: { username } });

    if (user && (await bcrypt.compare(userpw, user.userpw))) {
      res.json({ user: user });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const logoutUser = (req, res) => {
  res.send('Logout successful');
};

module.exports = {
  getUsers,
  getUserById,
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
};
