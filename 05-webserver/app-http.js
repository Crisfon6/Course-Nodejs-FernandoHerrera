const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    let out = {
        name: 'Cristhian',
        age: 21
    }
    res.write(JSON.stringify(out));
    res.end();
}).listen(8080);

console.log('Listen in port 8080');