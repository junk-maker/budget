require('dotenv').config();
const express = require('express');


//App and port
const app = express();
const port = process.env.PORT || 5000;
const blue = '\x1b[34m%s\x1b[0m';


//Server
app.listen(port, () => console.log(blue, `Server has been started on port ${port}!`));