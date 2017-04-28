var express        = require('express'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler   = require('errorhandler'),
    morgan         = require('morgan'),
    routes         = require('./backend'),
    api            = require('./backend/api');
    Vue            = require('vue');
    requirejs      = require('requirejs');
    multer         = require('multer');
    fs             = require('fs');
    path           = require('path');
    vuforia        = require('vuforiajs');
    glob           = require('glob');

var util = vuforia.util();

var storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null, 'uploads/')
  },
  filename: function(req,file,cb){
    cb(null, Date.now() + '.jpg')
  }
})

var multerUpload = multer({storage: storage});
var mpwUpload = multer({dest:"pwUpdate/"}); 

Vue.use(require('vue-resource'));

var app = module.exports = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(__dirname + '/'));
app.use('/build', express.static('public'));

var env = process.env.NODE_ENV;
if ('development' == env) {
  app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
}

if ('production' == app.get('env')) {
  app.use(errorHandler());
}

app.get('/', routes.index);
app.all('/api/events', api.events);
app.all('/api/events/:eventId', api.event)

app.post('/uploads', multerUpload.single('imageUpload'), function(req, res){
   
   var uni = req.file;
   var uniTarget = req.body;

   var update = {

    // 'name': 'room50',
    'width': 1,
    'image': uni,
    'active_flag': true,
    // 'application_metadata': pwFile 

   };

   update.image = util.encodeFileBase64(__dirname + '/uploads/' + uni.filename);

    var client = vuforia.client ({
      // provision_access_key
        'accessKey': '',

        // server_secret_key
        'secretKey': ''
    });


    if(uniTarget.uni == 'VUFORIA TARGET ID FOR ROOM 50'){
      client.updateTarget(uniTarget.uni, update, function (error, result) {
        if(error){
          console.log("Something went wrong for Room 50!", error)
        } else{
          console.log(result)
        }
      })
    } if(uniTarget.uni == 'VUFORIA TARGET ID FOR ROOM 15'){
       client.updateTarget(uniTarget.uni, update, function (error, result) {
        if(error){
          console.log("Something went wrong for Room 15!", error)
        } else{
          console.log(result)
        }
      })
    } if(uniTarget.uni == 'VUFORIA TARGET ID FOR ROOM 20'){
       client.updateTarget(uniTarget.uni, update, function (error, result) {
        if(error){
          console.log("Something went wrong for Room 20!", error)
        } else{
          console.log(result)
        }
      })
    } if(uniTarget.uni == 'VUFORIA TARGET ID FOR MEETING ROOM'){
       client.updateTarget(uniTarget.uni, update, function (error, result) {
        if(error){
          console.log("Something went wrong for Meeting Room!", error)
        } else{
          console.log(result)
        }
      })
    } else (uniTarget.uni == 'VUFORIA TARGET ID FOR CONFERENCE ROOM')
       client.updateTarget(uniTarget.uni, update, function (error, result) {
        if(error){
          console.log("Something went wrong for Conference Room!", error)
        } else{
          console.log(result)
        }
      })

   res.redirect('back');

});

app.post('/pwUpdate', mpwUpload.single('pwUpload'), function(req,res){


  var pw = req.body.pwUpload;
  var update = {

    'active_flag': true,
    'application_metadata': null  

  };

  fs.writeFile(__dirname + "/pwUpdate/pw.txt", pw, function(err) {
    if(err) {
        return console.log(err);
    }

    update.application_metadata = util.encodeFileBase64(__dirname + '/pwUpdate/pw.txt');

    var client = vuforia.client ({
      // provision_access_key
        'accessKey': '',
        // server_secret_key
        'secretKey': ''
    });

    client.updateTarget("VUFORIA TARGET ID FOR PASSWORD", update, function (error, result) {
      if(error){
        console.log("Something went wrong!", error)
      } else{
        console.log(result)
      }
      util.decodeBase64(update.application_metadata);
    
    });

  }); 

  res.redirect('back');
});


app.listen(8080);
console.log('Magic happens on port 8080...');