
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();


//imports
const personRoutes = require('./routes/routes.js');

//settings
app.set('port', 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
//routes
app.use(personRoutes);



//run
app.listen(app.get('port'), () => {
    console.log('Server on Port 3000')
})