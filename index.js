const http = require('http');
const port = 3000;
  const fs = require('fs');
fs.readFile('C:/Users/vlisn/Documents/speechapi/texttogif/index.html', function (err, html) {
   if (err) throw err;
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(html);
  res.end()
}).listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
});

  console.log(`server is listening on ${port}`)
});
var main = function () {
    syncRecognize();
}
if (require.main === module) {
    main();
}
function syncRecognize () {
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
  speech.recognize(request)
    .then((data) => {
      const response = data[0];
      const transcription = response.results.map(result =>
          result.alternatives[0].transcript).join('\n');
      console.log(`Transcription: `, transcription);
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });

  }
