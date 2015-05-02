/**
    Little script that parses the raw csv data of the
    cities and provincies in argentina and outputs it to a json object
    that we can use throughout the app.

    # Inpuit

    # Output
    Json version of the csv, the name will be:
    ./arg_data.json

*/


var Converter=require("csvtojson").core.Converter;
var fs=require("fs");

var csvFileName="./arg_data.csv";
var fileStream=fs.createReadStream(csvFileName);
var dest = fs.createWriteStream('./arg_data.json');
//new converter instance
var csvConverter=new Converter({constructResult:true});

//end_parsed will be emitted once parsing finished
csvConverter.on("end_parsed",function(jsonObj){
   console.log(jsonObj); //here is your result json object
});

//read from file
fileStream.pipe(csvConverter).pipe(dest);
