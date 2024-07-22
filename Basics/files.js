const fs = require('fs');
//console.log(fs);

// Reading files : Asynchronous
fs.readFile('./docs/text.txt', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data.toString());
    }
});

// Writting files : Asynchronous (if file doesn't exist it creates it)
fs.writeFile('./docs/text2.txt', 'Hello World!', (err, data) => {
    console.log('File was written');
})

// Directories
if (!fs.existsSync('./assets')) {
    fs.mkdir('./assets', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Folder created');
        }
    });
} else {
    fs.rmdir('./assets', () => {
        console.log("Directory removed");
    });
}

// Deleting files

if (fs.existsSync('./docs/text2.txt')) {
    fs.rm('./docs/text2.txt', () => {
        console.log("File removed");
    });
}