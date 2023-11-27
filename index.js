const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require("cookie-parser");
const session = require("express-session");
require("dotenv").config();
const database = require("./config/database");
const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
const systemConfig = require("./config/system");
database.connect();
const app = express()
const port = process.env.PORT;

app.use(methodOverride('_method'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', './views');
app.set('view engine', 'pug');
//fash
app.use(cookieParser('ASDUHHSSS'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
//end fash
//App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin
app.use(express.static("public"));
//route
route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})