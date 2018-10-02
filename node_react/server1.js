var express = require('express');                                                 
var app = express(); 
var bodyParser = require('body-parser'); 
    var mysql = require('mysql'); 
    const cors = require("cors"); 
var con = mysql.createConnection({ 
  host: "localhost", 
  user: "root", 
  password: "", 
  database: "test" 
}); 
   var departments; 
con.connect(function(err) { 
  if (err) throw err; 
  console.log("Connected!"); 
}); 
 
var PORT = process.env.PORT || 4000; 
 
 
app.use(bodyParser.urlencoded({ 
    extended: true 
  })); 
   
  app.use(bodyParser.json()); 
   
   
app.use(express.static(__dirname)); 
 
app.use(cors()); //enables you to fetch data in react file  
// app.use(express.bodyParser()); 
// app.use(express.cookiePaser()); 
app.get('/departments', function(req, res) { 
  console.log("request for departmentsssss"); 
  
  con.query("SELECT * FROM departments ",function(err, rows, fields) { 
        if (err) throw err; 
    console.log("listing"+JSON.stringify(rows, null,2 )); 
res.send(JSON.stringify(rows, null,2 )); 
// res.send("hii departemntsss"); 
});   
      
     
}); 
 
app.post('/departments/:depname', function(req, res) { 
  console.log("request arrived with depname=="+req.params.depname); 
     
var da = { 
            depname: req.params.depname, 
        } 
  con.query("INSERT INTO departments SET ?",da , function(err, result) { 
    if (err) throw err; 
 
    console.log("1 record inserted"); 
    console.log(da.depname); 
  }); 
//   con.query("SELECT * FROM departments ORDER BY depid DESC LIMIT 1",function(err, row, fields) { 
//     if (err) throw err; 
// console.log(JSON.stringify(row, null,2 )+"in server.jss0"); 
res.send("hii departemntsss"); 
// res.send("hii departemntsss"); 
// });   
     
 
}); 
 
app.put('/departments/:depid/:depname', function(req, res) { 
    console.log("inisde edit dep "+ req.params.depname); 
   // var id = req.params.depid; 
    var newName = req.params.depname; 
    var da = { 
      depname: req.params.depname, 
      };  
     
    console.log("update me ::::"+newName); 
    
     con.query("UPDATE departments SET ? WHERE depid =" + req.params.depid, da, function( 
        err, 
        result 
      ) { 
        if (err) throw err; 
     
      }); 
      con.query( "UPDATE students SET sdepname = ? WHERE sdepid = " + req.params.depid, req.params.depname, function( 
        err, 
        result 
      ) { 
        if (err) throw err; 
        res.send("Successfully updated student!"); 
      });  
    }); 
 
app.delete('/departments/:depid', function(req, res) { 
    console.log("request for delete"+req.param.depid); 
con.query("DELETE FROM departments WHERE depid = " + req.params.depid, function(err, result) { 
    if (err) throw err; 
     
  });      
    console.log("1 record deleted"); 
 
    res.send('Successfully deleted product!'); 
}); 
////////////////////////////////////////////////////// 
 
app.get('/students/:depid', function(req, res) { 
  console.log("listing students"); 
  
  con.query("SELECT * FROM students WHERE sdepid = " + req.params.depid, function(err, rows, fields) { 
        if (err) throw err; 
    console.log("listing students"); 
res.send(JSON.stringify(rows, null,2 )); 
});   
      
     
}); 
 
app.post('/students/:sname/:semail/:sage/:sdepname/:sdepid', function(req, res) { 
 
    console.log(req.body.dname+" bodyyyyyyy   Dep id of student"); 
var da = { 
            sname : req.params.sname, 
    semail:req.params.semail, 
 sage: req.params.sage, 
     sdepid: req.params.sdepid, 
     sdepname: req.params.sdepname, 
        } 
  con.query("INSERT INTO students SET ?",da , function(err, result) { 
    if (err) throw err; 
 
    console.log("1 student record inserted"); 
   
  }); 
   res.send('Successfully created student!'); 
 
}); 
 
app.put('/students/:id/:sname/:semail/:sage/:sdepname/:sdepid', function(req, res) { 
 
    var id = req.params.id; 
    
    var semail = req.body.semail; 
    var sdepid= req.body.sdepid; 
 var sdepname= req.body.sdepname; 
var sage= req.body.sage; 
// console.log(+"body edit name     "+"paramssss    "+req.params.sname); 
    var da = { 
     sname : req.params.sname, 
    semail: req.params.semail, 
 sage: req.params.sage, 
     sdepid: req.params.sdepid, 
     sdepname: req.params.sdepname, 
      }; 
    console.log("update me"); 
      
     con.query("UPDATE students SET ? WHERE id = " + req.params.id, da, function(err, result){ 
 
     }); 
    res.send('Succesfully updated product!'); 
}); 
 
app.delete('/students/:id', function(req, res) { 
    //var depid = req.params.depid; 
    console.log("request for delte"); 
con.query("DELETE FROM students WHERE id = " + req.params.id, function(err, result) { 
    if (err) throw err; 
     
  });      
    console.log("1 record deleted"); 
 
    res.send('Successfully deleted product!'); 
}); 
//////////////////////////// 
 
app.listen(PORT, function() { 
    console.log('Server listening on ' + PORT); 
});

