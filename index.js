const fs = require('fs');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
   res.sendFile('C:/Users/vlisn/Documents/speechapi/texttogif/index.html');
});

io.on('connection', function(socket) {
   socket.on('record', function(){
    //  syncRecognize();
      //socket.send("hello" +   transcription);
//function syncRecognize () {

  const Speech = require('@google-cloud/speech');

  // Instantiates a client
  const speech = Speech();
  // The path to the local file on which to perform speech recognition, e.g. /path/to/audio.raw
  // const filename = '/path/to/audio.raw'
   const filename = 'C:/Users/vlisn/Documents/speechapi/texttogif/audio.raw';
  // The encoding of the audio file, e.g. 'LINEAR16'
  // const encoding = 'LINEAR16';
  const encoding = 'LINEAR16';

  // The sample rate of the audio file in hertz, e.g. 16000
  // const sampleRateHertz = 16000;
  const sampleRateHertz = 16000;

  // The BCP-47 language code to use, e.g. 'en-US'
  // const languageCode = 'en-US';
  const languageCode = 'en-US';

  const config = {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode
  };
  const audio = {
    content: fs.readFileSync(filename).toString('base64')
  };

  const request = {
    config: config,
    audio: audio
  };

  // Detects speech in the audio file
  var transcription = "";
  speech.recognize(request)
    .then((data) => {
      const response = data[0];
      transcription = response.results.map(result =>
          result.alternatives[0].transcript).join('\n');
      console.log(`Transcription: `, transcription);
      socket.send(transcription);
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
    //  socket.send("hello" +   transcription);

//  }
});
});
  http.listen(3000, function() {
     console.log('listening on *:3000');
  });
