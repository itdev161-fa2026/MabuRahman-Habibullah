import express from 'express';


const app = express();


app.get('/', (req, res) =>
    res.send('http get request sent to root api endpoint')
);

app.listen(3000, () => console.log('express server running on port 3000'));