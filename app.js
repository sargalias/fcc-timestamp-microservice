const express = require('express');
const moment = require('moment');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/public')));


app.get('/api/:date', (req, res) => {
    let input = req.params.date;
    if (input.match(/^\d+$/)) {
        input = parseInt(input) * 1000;
        if (input < 0) {
            return res.json({unix: null, natural: null});
        }
    }
    let date = new Date(input);
    res.json({
        unix: date.valueOf()/1000,
        natural: (date.valueOf()) ? moment(date).format('MMMM D, YYYY') : null
    });
});

app.get('*', (req, res) => {
    res.redirect('/');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Listening on port ' + port);
});