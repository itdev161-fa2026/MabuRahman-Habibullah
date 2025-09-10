import express, { json } from 'express';
import connectDatabase from './config/db.js';


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
app.post('/api/users', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

app.listen(3000, () => console.log('express server running on port 3000'));