import * as express from 'express';
import User from '../models/userModel';
let router = express.Router();

/**
route for a GET request on all users
*/
router.get('/', (req, res) => {
    User.find().then((users) => {
        res.json(users);
    }).catch((err) => {
        console.log(err.message);
        res.sendStatus(400);
    });
});
/*GET user by the id*/
router.get('/:id', (req, res) => {
    let userId = req.params['id'];
    console.log(userId);
    User.findById(userId).then((user) => {
        res.json(user);
    }).catch((err) => {
        console.error(err);
        res.send(err);
    });
});
/*Save a user*/
router.post('/', (req, res) => {
    let newUser = new User();
    newUser.username = req.body.username;
    newUser.password = req.body.password;

    newUser.save().then((user) => {
        res.json(user);
    }).catch((err) => {
        console.error(err);
        res.status(400).json(err);
    });
});
/*Update a user with a specified id*/
router.post('/:id', (req, res) => {
    let userId = req.params['id'];

    User.findById(userId).then((user) => {
        user.username = req.body.username;
        user.password = req.body.password;

        user.save().then((changedUser) => {
            res.json(changedUser);
        }).catch((err) => {
            res.status(400).json(err);
        });

    }).catch((err) => {
        console.error(err);
        res.send(err);
    });
});
/*Delete a user acout user their ID*/
router.delete('/:id', (req, res) => {
    let userId = req.params.id;
    User.findByIdAndRemove(userId).then((user) => {
        res.json(user);
    }).catch((err) => {
        console.error(err);
        res.json(err);
    });
});

export default router;
