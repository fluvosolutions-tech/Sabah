import fs from 'fs';
import https from 'https';
import path from 'path';

const dir = path.join(process.cwd(), 'public');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const file = fs.createWriteStream(path.join(dir, 'logo.png'));
const url = 'https://drive.google.com/uc?export=download&id=1oRK12fMcZrdeH71Tw_Gwf8f2xNif4vXo';

function download(url) {
  https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      download(res.headers.location);
    } else {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('Downloaded');
      });
    }
  });
}

download(url);
