const fs = require('fs').promises;

const fsSync = require('fs');

const dir = `./output/`;
const finalJsonFormat = {
    "countries": {

    }
}

function fileExists(uri) {
    return fsSync.existsSync(uri);
}

async function write(data, uri) {
    return fs.writeFile(uri, data, { encoding: 'utf-8' });
}

async function read(uri) {
    return fs.readFile(uri, { encoding: 'utf-8' });
}

function stitchAllCountries() {
    fsSync.readdir(dir, (err, files) => {
        return new Promise((resolve, reject) => {
            if (err) reject(err);
            files.forEach(file => {
                if (!file.endsWith('json')) return;
                let content = require(`${dir}${file}`);
                finalJsonFormat["countries"][file.split('.')[0]] = content;
            });
            resolve(finalJsonFormat);
        }).then(finalJsonFormat => {
            // fsSync.writeFileSync('./final.json', JSON.stringify(finalJsonFormat, null, 2));
            fsSync.writeFileSync('./final.json', JSON.stringify(finalJsonFormat));
        });
    });
}

module.exports.write = write;
module.exports.read = read;
module.exports.fileExists = fileExists;
module.exports.stitchAllCountries = stitchAllCountries;