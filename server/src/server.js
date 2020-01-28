const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const morgan = require('morgan');
const app = express();

// routes import
const orbit = require('./routes/orbit');

// app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// ***** routes
app.use('/api/orbit', orbit);
// ***** end routes

app.get("*", (req, res) => {
    res.send([{
        title: "Мы еще ничего не создали"
    }]);
});

const port = 3000;
app.listen(port, () => console.log(`Server has been started on ${port}`));
