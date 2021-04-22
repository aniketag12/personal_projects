const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");



app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

 app.use('/public', express.static(__dirname + '/public'));

app.get("/" , function(req,res){
  res.sendFile(__dirname + "/signup.html")
});

app.post("/" , function(req,res){
  var lname = req.body.lname
  var fname = req.body.fname
  var email = req.body.email

  var data  = {
    members :[
      {
      email_address : email ,
      status : "subscribed" ,
      merge_fields:{
        FNAME : fname ,
        LNAME : lname
      }

    }
  ],
  update_existing : true 
  };

  var jsonData = JSON.stringify(data);

  var url = 'https://' + 'us1' + '.api.mailchimp.com/3.0/lists/ea49b08a24' ;
  const options = {
    method : "POST" ,
    auth : "aniket:{api key} 
  }
  const request = https.request(url , options , function(response){

    if(response.statusCode ===200){
      res.sendFile(__dirname + "/success.html")
    }else{
      res.sendFile(__dirname + "failure.html")
    }


   response.on("data" , function(data){
     console.log(JSON.parse(data))
   })
  })
  request.write(jsonData);
  request.end();

});
app.post("/failure" , function(req, res){
  res.redirect("/")
});

app.listen(3000,function(){
  console.log("server is running at port 3000!")
});

 //
 //  list id  -
