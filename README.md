# RESTful API
Setting up a RESTful API to implement HTTP verbs GET, POST, DELETE, PUT and PATCH

A simple API to serve articles similar to Wikipedia.

*This API does not use any security to access the endpoints.

## Using the API

API end point is at */articles* to access all the articles in the database.
*/articles/<article-title>* to access a specific article.

## Setting up
The project uses npm packages like mongoose, express and body-parser.

use the following command to install all the necessary dependencies.
```
npm install  
```

Using MongoDB database to store the documents.
The name of the database is *wikiDB*, the collection name is *articles*.

Create the necessary documents before running the server. The data for the database is stored in the *data.txt* file.

## Mongoose code for CRUD

### To GET all the articles from the DB
```
<ModelName>.find({conditions}, function(err, results){
  use the found results docs.
});
```

### To POST data to the DB
```
const <consttantName> = new <ModelName>({
  <fieldName>: <fieldData>,
  ...
})
<consttantName>.save();
```
### To DELETE all from the DB
```
<ModelName>.deleteMany({conditions}, function(err){});
  ```

##  To GET a specific article
```
  <ModelName>.findOne(
    {condiions},
    function(err, result){
      //use the found results
    }
  );
```  
###  To PUT a specific article
```
  <ModelName>.update(
    {condiions},
    {updates},
    {overwrite: true}
    function(err, result){
    }
  );
```
### TO PATCH a specific article
using *$set* keyword and passing the form data.
