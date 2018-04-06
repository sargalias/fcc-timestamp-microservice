const express = require('express');
const moment = require('moment');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/public')));


app.get('/:date', (req, res) => {
    let input = req.params.date;
    if (input.match(/^\d+$/)) {
        input = parseInt(input) * 1000;
    }
    let date = new Date(input);
    res.json({
        unix: date.valueOf()/1000,
        natural: moment(date).format('MMMM D, YYYY')
    });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Listening on port ' + port);
});