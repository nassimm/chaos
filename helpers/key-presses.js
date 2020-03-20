const { Observable } = require('rxjs');
const ioHook = require('iohook');

module.exports = {
  keyPresses$: Observable.create(observer => {
    ioHook.on('keydown', event => {
      observer.next(event); // { type: 'mousemove', x: 700, y: 400 }
    });
    ioHook.start();
  })
}