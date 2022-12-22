//jshint esversion:6

const express = require("express")
const bodyParser = require("body-parser")

const app = express()
let items = ["buy Food", "Cook food", "Eat food"];
let workItems = [];

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", function(req,res){
    let today = new Date()

    let options = { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
    };
    let day = today.toLocaleDateString("en-US", options)
    console.log(items);
    console.log(workItems);
    res.render("lists", {newListItems: items,titleList: day})
})

app.post("/", function(req,res){
    console.log(req.body.button)

    if(req.body.button === "Work List"){
        workItems.push(req.body.newItem);
        res.redirect("/work");
    }else{
        items.push(req.body.newItem);
        res.redirect("/");
    }
    
})

app.get("/work", function(req,res){
    res.render("lists", {newListItems: workItems, titleList: "Work List"})
})

app.get("/about", function(req,res){
    res.render("about")
})
app.listen(3000, function(){
    console.log("server is running on port 3000");
})