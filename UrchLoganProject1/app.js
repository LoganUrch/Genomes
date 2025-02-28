const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const itemRoutes = require("./routes/itemRoutes");

const app = express();
const PORT = process.env.PORT || 4893;

app.set("view engine", "ejs");+
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

app.use("/", itemRoutes);
app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});
app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status){
        err.status = 500;
        err.message = ("Internal Server Error");
    }
    res.status(err.status);
    res.render('error', {error: err});
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
