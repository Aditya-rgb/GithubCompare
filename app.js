const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");
const Buffer = require('buffer/').Buffer
const utf8 = require('utf8');

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.get("/" , function(req , res){

   res.sendFile(__dirname +"/index.html" );
});

app.post("/" , function(req , res){

     const user = req.body.username;
     const url = "https://api.github.com/users/"+user ;
     const options = { headers: {'user-agent': 'node.js'}};
         https.get(url ,options, function(response){
         let chunks = [];

         response.on("data", function(data){

           chunks.push(data);

              }).on('end' , function(){
                  let data1 = Buffer.concat(chunks);
                  let schema = JSON.parse(data1);
                  const alpha = schema.login;
                  const bravo = schema.id;
                  const charlie = schema.url;
                  const delta = schema.name;
                  const elephant = schema.public_gists;
                  const faug = schema.following;
                  const gre = schema.followers;
                  const house = schema.public_repos;
                  const india = schema.public_gists;
                  const joker = schema.twitter_username;
                  const kilo = schema.html_url;
                  /*
                  res.write("<h1>The Login name is " + temp + "</h1>" );
                  res.write("<h1>ID  is " + bravo + "</h1");
                  res.send();
                  */
                  res.render("list" , {login:alpha , id:bravo , url:charlie , name:delta , public_gists:elephant , following:faug , followers:gre , public_repos:house , public_gists:india , twitter_username:joker , html_url:kilo});
      });

      });


 });
