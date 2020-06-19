// Importing Express
var express = require("express");
var app = express();

var PORT = process.env.PORT;

// Express.static will define a static folder to look for files and serve to the client
app.use(express.static("pages"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

var dogs = [
    {
        name: "Emma",
        breed: "Husky",
        age: 1
    },
    {
        name: "Sora",
        breed: "Shiba",
        age: 3
    },
    {
        name: "Kora",
        breed: "Lab",
        age: 5
    }
]

// GET function needs to parameters: req, res
app.get("/dogs", function(req, res){
    // Console.log won't be seen anywhere, it's just for internal/debugging purposes
    console.log("We are in the endpoint for dogs!");
    res.json(dogs)
});

app.get("/addDogs", function(req, res){
    res.send("/addDogs.html")
});

app.get("/dogs/:breed", function(req, res){
    var chosenDog = req.params.breed;

    for(var i = 0; i<dogs.length; i++){
        if(chosenDog === dogs[i].breed){
            return res.json(dogs[i])
        }
    }
    console.log(chosenDog);
    res.send("Here's your dog!");
});

app.post("/dogs", function(req, res){
    console.log(`Here is the body from req.body, we are adding this dog: ${req.body}`)
    var newdog = req.body;
    dogs.push(newdog);
    res.send(dogs);
});

app.listen(PORT, function(){
    console.log(`App is listening on port ${PORT}`);
});