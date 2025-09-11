import express, { json } from 'express';
import connectDatabase from './config/db.js';
import {check, validationResult} from 'express-validator';


const app = express();


connectDatabase();

app.use(express.json({ extended: false }));

// API endpoints
/**
 * @route Get /
 * @desc Test endpoint
 */


app.get('/', (req, res) =>
    res.send('http get request sent to root api endpoint')
);

/**
 * @route Post api/users
 * @desc Register user
 */
app.post('/api/users', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
], (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    } else {
        return res.send(req.body);
    }
    res.json(req.body);
}
);

app.listen(3000, () => console.log('express server running on port 3000'));