const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//connect to database
mongoose.connect("mongodb://localhost:27017/wikiDB");


//create the schema
const articleSchema = {
  title: String,
  content: String
};


//create model-(uppercase first letter, singular)
const Article = mongoose.model("Article", articleSchema);

app.get("/", function(req, res){
  res.set("Content-Type", "text/html");
  res.write("<p>API end point at /articles</p>");
  res.write("<p>Use verbs GET, POST, DELETE to access all articles</p>");
  res.write('<p>Use verbs GET, PUT, PATCH, DELETE to access specific articles at /articles/"article-title"</p>');
  res.send();
})

////Requests targeting all articles////
//creating chainable route handlers, to decrease redundancy and typos
app.route("/articles")

.get(function(req, res){
  Article.find(function(err, foundArticles){
    if (!err) {

      res.send(foundArticles);
    }
    else{
      res.send(err);
    }
  })
})

.post(function(req, res){
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  })
  newArticle.save(function(err){
    if (!err) {
      res.send("successfully added new article");
    }else{
      res.send(err);
    }
  });
})

.delete(function(req, res){
  Article.deleteMany(function(err){
    if (!err) {
      res.send("Successfully deleted all articles");
    }else{
      res.send(err);
    }
  })
});



//Requests targeting a specific article//
app.route("/articles/:articleTitle")
.get(function(req, res){
  Article.findOne(
    {title: req.params.articleTitle},
    function(err, foundArticle){
      if (!err) {
        res.send(foundArticle);
      }else{
        res.send(err);
      }
    }
  )

})

.put(function(req,res){
  //does not work
  // Article.update(
  //   {title: req.params.articleTitle},
  //   {title: req.body.title,
  //   content: req.body.content},
  //   {overwrite: true},
  //   function(err){
  //     if (!err) {
  //       res.send("successfully updated the article");
  //     }else{
  //       res.send(err);
  //   }
  // }
  // )

  //works
  Article.findOneAndUpdate(
    {title: req.params.articleTitle},
    {title: req.body.title,
      content: req.body.content},
  // {upsert: true},
  function(err, doc) {
      if (err)
        return res.send(500, {error: err});
      return res.send('Succesfully saved.');
  })
})



.patch(function(req, res){
  Article.findOneAndUpdate(
    {title: req.params.articleTitle},
    {$set: req.body},
  // {upsert: true},
  function(err, doc) {
      if (err)
        return res.send(500, {error: err});
      return res.send('Succesfully saved.');
  })
})

.delete(function(req, res){
  const articleTitle = req.params.articleTitle;
  Article.findOneAndDelete(
    {title: articleTitle}, function(err){
    if (!err){
      res.send("Successfully deleted selected article.");
    } else {
      res.send(err);
    }
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
