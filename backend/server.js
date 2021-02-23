require('dotenv').config();
const express = require('express');


//App and port
const app = express();
const blue = '\x1b[34m%s\x1b[0m';
const PORT = process.env.PORT || 5000;



//Server
app.listen(PORT, () => console.log(blue, `Server has been started on port ${PORT}!`));