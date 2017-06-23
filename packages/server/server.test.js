const FructoseServer = require('./server').FructoseServer;
const client = require('socket.io-client');
const portfinder = require('portfinder');

describe('FructoseServer', () => {
  var server;
  var PORT;
  var socket;

  beforeAll( () => {
    return portfinder.getPortPromise()
    .then((port) => {
      PORT = port;
      server = new FructoseServer(PORT);
      socket = client(`http://localhost:${PORT}`);
    })
    .then( () => server.start());
  });

  afterAll( () => {
    socket.disconnect();
    server.close()
  });

  it('forwards the loadComponent message', (done) => {
    socket.on('load-on-device', (x,y) => {
      expect(x).toBe(1);
      expect(y).toBe(2);
      done();
    });

    socket.emit('loadComponent', 1, 2);
  });

  it('forwards the loadedOnDevice message', (done) => {
    var messagesReceived = 0;

    socket.on('loaded', () => {
      messagesReceived++;
      expect(messagesReceived).toBe(1);
      done()
    });

    socket.emit('loadedOnDevice');
  });

  
});