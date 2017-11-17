const fs = require('fs');
const path = require(`path`);
const cwd = path.join(__dirname, `..`);
const express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var record = require('node-record-lpcm16');
var giphy = require('giphy-api')( 'jnfd75LW8kmGvMt2wo466LYm7GFAWP5T' );

app.get('/', function(req, res) {
   res.sendFile('C:/Users/vlisn/Documents/speechapi/texttogif/index.html');
});

app.use(express.static(__dirname));

app.use('/images', express.static(__dirname +'/images'));

io.on('connection', function(socket) {
   socket.on('record', function(){
   function recordSpeech() {
     const record = require('node-record-lpcm16');

     // Imports the Google Cloud client library
     const Speech = require('@google-cloud/speech');

     // Instantiates a client
     const speech = Speech();

     // The encoding of the audio file, e.g. 'LINEAR16'
     //
     const encoding = 'LINEAR16';

     // The sample rate of the audio file in hertz, e.g. 16000
     //
     const sampleRateHertz = 16000;

     // The BCP-47 language code to use, e.g. 'en-US'
     //
     const languageCode = 'en-US';

     const request = {
       config: {
         encoding: encoding,
         sampleRateHertz: sampleRateHertz,
         languageCode: languageCode
       },
       interimResults: false // If you want interim results, set this to true
     };

     // Create a recognize stream
     const recognizeStream = speech.streamingRecognize(request)
       .on('error', console.error)
       .on('data', function(data) {
       try {
         var str = data.results[0].alternatives[0].transcript;
       // I want a Coke
        if(str.indexOf("okay freestyle") > -1) {
            var command = data.results[0].alternatives[0].transcript;
        if(command.indexOf("I want a ") > -1 ){
             socket.send(command);
             socket.emit('soda', command.split('want a ').pop());
          }
         }
       } catch (err) {
       }



           process.stdout.write(
             (data.results[0] && data.results[0].alternatives[0])
               ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
               : `Reached end only one minute`)});





     // Start recording and send the microphone input to the Speech API
     record
       .start({
         sampleRateHertz: sampleRateHertz,
         threshold: 0,
         // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
         verbose: true,
         recordProgram: 'sox', // Try also "arecord" or "sox"
         silence: '3.0'
       })
       .on('error', function(){console.log("recognize error")})
       .pipe(recognizeStream);
    console.log("start recording");

    setTimeout(function () {
     record.stop()
     console.log("stop recording")
     recordSpeech();
    }, 60000)


     }
     recordSpeech();


     });
});
  http.listen(3000, function() {
     console.log('listening on *:3000');
  });
