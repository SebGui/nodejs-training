const fs = require('fs');

// Read Streams
const readStream = fs.createReadStream('./docs/textLong.txt', {encoding: 'utf8'});

// Write Streams
const writeStream = fs.createWriteStream('./docs/textWrite.txt');

// "Classic" long way
/*readStream.on('data', (chunk) => {
    console.log('========= New chunk =========');
    console.log(chunk);

    // Copying file with markers
    writeStream.write('\n New Chunk \n');
    writeStream.write(chunk);
});*/

// Piping
readStream.pipe(writeStream);
