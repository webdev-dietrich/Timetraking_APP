module.exports = (app) => {

    const UserController = require("../controllers/users.controller");
    const router = require('express').Router();
    router.get('/', UserController.getUsers);
    router.get('/:id', UserController.getUserById);
    router.post('/register', UserController.registerUser);
    router.put('/:id', UserController.updateUser);
    router.post('/login', UserController.loginUser);

    app.use('/api/users', router);
};