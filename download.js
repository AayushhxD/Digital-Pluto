const https = require('https');
const fs = require('fs');

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      console.log('Status code:', response.statusCode);
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        console.log('Redirecting to:', response.headers.location);
        download(response.headers.location, dest).then(resolve).catch(reject);
      } else {
        const file = fs.createWriteStream(dest);
        response.pipe(file);
        file.on('finish', () => file.close(resolve));
      }
    }).on('error', reject);
  });
}

async function run() {
  try {
    console.log("Downloading Pluto image...");
    await download('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Pluto_in_True_Color_-_High-Res.jpg/600px-Pluto_in_True_Color_-_High-Res.jpg', 'public/pluto.jpg');
    console.log("Downloading video...");
    await download('https://drive.google.com/uc?export=download&id=1GnDJHPq21MLJtCSF3F0BnH4voDA5yAdU', 'public/pluto_video.mp4');
  } catch (err) {
    console.error(err);
  }
}

run();
