//the code below is available on: https://github.com/mikhail-cct/CA1-In-class-Demo

var http = require('http'),
    path = require('path'),
    express = require('express'),
    fs = require('fs'),
    xmlParse = require('xslt-processor').xmlParse,
    xsltProcess = require('xslt-processor').xsltProcess,
    xml2js = require('xml2js'),
    autosanitizer = require('express-autosanitizer');

var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname,'views')));
router.use(express.urlencoded({extended: true}));
router.use(express.json());
router.use(autosanitizer.allUnsafe);

function xmlFileToJs(filename, cb) {
  var filepath = path.normalize(path.join(__dirname, filename));
  fs.readFile(filepath, 'utf8', function(err, xmlStr) {
    if (err) throw (err);
    xml2js.parseString(xmlStr, {}, cb);
  });
}

function jsToXmlFile(filename, obj, cb) {
  var filepath = path.normalize(path.join(__dirname, filename));
  var builder = new xml2js.Builder();
  var xml = builder.buildObject(obj);
  fs.writeFile(filepath, xml, cb);
}

router.get('/',function(req,res){

    res.render('index');

})

router.get('/get/html',function(req,res){

    res.writeHead(200,{'content-Type':'text/html'});

    var xml = fs.readFileSync('Movies.xml','utf-8');
    var xsl = fs.readFileSync('Movies.xsl','utf-8');
    var doc = xmlParse(xml);
    var stylesheet = xmlParse(xsl);

    var result = xsltProcess(doc,stylesheet);

    res.end(result.toString());

});

router.post('/post/json', function(req, res) {

  
  function appendJSON(obj) {
    console.log(obj);

    

    
    xmlFileToJs('Movies.xml', function(err, result) {
      if (err) throw (err);
      result.medialist.category[obj.sel_n].record.push({'title': obj.title, 'genre': obj.genre, 
      'director': obj.director, 'year': obj.year,'duration': obj.duration, 'comments': obj.comments});
      console.log(result);
      jsToXmlFile('Movies.xml', result, function(err) {
        if (err) console.log(err);
        
      })
    })


  };

 
  appendJSON(req.body);

  
  res.redirect('back');

});

   

    
 




router.post('/post/delete', function(req, res) {

  // Function to read in a JSON file, add to it & convert to XML
  function deleteJSON(obj) {
    // Function to read in XML file, convert it to JSON, delete the required object and write back to XML file
    xmlFileToJs('Movies.xml', function(err, result) {
      if (err) throw (err);
      //This is where we delete the object based on the position of the section and position of the entree, as being passed on from index.html
      delete result.medialist.category[obj.category].record[obj.record];
      //This is where we convert from JSON and write back our XML file
      jsToXmlFile('Movies.xml', result, function(err) {
        if (err) console.log(err);
      })
    })
  }

  // Call appendJSON function and pass in body of the current POST request
    deleteJSON(req.body);

});

    server.listen(process.env.PORT ||3000, process.env.IP, function(){

    var addr = server.address();
    console.log('Server is listening at: ',addr.address + ':' + addr.port);

});
