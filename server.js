//firsr setup the server-modules and port
const express=require("express");
const bParse=require("body-parser");
const http=require("https");
const static=require("static");
const { join } = require("path");

const app=express();
app.use(bParse.urlencoded({extended:true}));

app.listen(3000,function(){
    console.log("Server is running at port:3000");
});

//second respond to "/" request with html form
app.get("/",function(req,res){
    res.sendFile(__dirname + "/form.html");
});

//third respond to post request send by html form
app.post("/",function(req,res) {
    const city=req.body.city;
    console.log(city);

    const aKey="c11917185e97574411f4918de9eb7e7a";
    const aCity=city;
    const url= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + aKey + "&units=metric";
    console.log(url);
    http.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const temp=JSON.parse(data).main.temp;
            const wDiscr=JSON.parse(data).weather[0].description;
            res.write("<h1>Todays temperature is " + temp + " degree Celcius </h1>");
            res.write("<h3>"+ wDiscr +"</h3>");
            res.send();
        })
    })
});
