var giphy = require('giphy-api')( 'jnfd75LW8kmGvMt2wo466LYm7GFAWP5T' );

giphy.search({
    q: 'pokemon',
    rating: 'g'
}, function (err, res) {
    console.log(res.data[1].url)
});

<div style="width:100%;height:0;padding-bottom:82%;position:relative;">
  <iframe src="https://giphy.com/embed/ySs4BuleHwbvy" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed">
</iframe>
</div>
  <p>
    <a href="https://giphy.com/gifs/beyonce-ySs4BuleHwbvy">via GIPHY</a>
  </p>
