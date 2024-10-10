const superagent = require('superagent');
const http = require('http');
const path = require('path');
const { setupServer } = require('msw/node');
const { HttpResponse, http: mwsHttp } = require('msw');

main().then(() => {});

async function main() {
  const server = http.createServer((_req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
  });
  
  await new Promise(res => {
    server.listen(51244, () => {
      console.log('Server is running on port 51244');
      res();
    })
  });
  
  let mwsServer = setupServer(mwsHttp.get('https://some-domain/url', () =>
    HttpResponse.text('mocked!')
  ))
  mwsServer.listen({ onUnhandledRequest: 'bypass' })


  server.on('clientError', (err, socket) => {
    console.log(err);
    console.log('"' + err.rawPacket.toString('ascii') + '"')
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
  });

  try {
    const result = await superagent
    .post('http://localhost:51244/test')
    .attach('file', path.resolve(`${__dirname}/test.png`))
    
    console.log('Response = ' + result.text)
  } catch (e) {
    console.log(e.message)
  }

  mwsServer.close()
  server.close()
}
