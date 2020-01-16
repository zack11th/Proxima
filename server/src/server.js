const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

const port = 3000;
app.listen(port, () => console.log(`Server has been started on ${port}`));

app.get("*", (req, res) => {
    res.send([{
        title: "Мы еще ничего не создали"
    }]);
});