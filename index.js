require('bootstrap/dist/css/bootstrap.css');    // change to .min
require('./public/styles/main.scss');

if(process.env.NODE_ENV === 'development')
    require('./public/index.html');


var d3 = require('d3'),
    $ = require('jquery');


// Require more files