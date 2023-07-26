import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let listItems = [];
let workItems = [];
let date = new Date();
let today = `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

/* Index/Homepage and Today's list */

app.get("/", function(req, res){

    res.render("index.ejs", {today: today});
})

app.post("/", function(req, res){
    let lastItem = req.body.newItem;
    listItems.push(lastItem);

    res.render("index.ejs", {listItem: lastItem, items: listItems, today: today, itemCount: listItems.length});
})

/* Work list */

app.get("/work", function(req, res){
    res.render("work.ejs")
})

app.post("/work", function(req, res){
    let lastWorkItem = req.body.newWorkItem;
    workItems.push(lastWorkItem);

    res.render("work.ejs", {listItem: lastWorkItem, items: workItems, itemCount: workItems.length})
})





app.listen(port, function(){
    console.log(`Server started on Port: ${port}`);
});