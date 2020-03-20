const { defer, Observable } = require('rxjs');
const { readFile, watchFile } = require('fs');
const { read: readLastLine } = require('read-last-lines');
const { lootFilterFile, logFile, stashUrl, POE_SSID } = require('./constants');
const axios = require('axios').default;

module.exports = {
  lootFilterFile$: Observable.create(observer =>
    readFile(lootFilterFile, 'utf-8', (err, fileRead) => {
      if (err) {
        observer.error(err);
      } else {
        observer.next(fileRead);
      }
      observer.complete();
    })
  ),
  logChanges$: Observable.create(observer =>
    watchFile(logFile, fileChange => observer.next(fileChange))
  ),
  lastLineOfLog$: defer(() => readLastLine(logFile, 1)),
  stash$: defer(() =>
    axios.get(stashUrl, { headers: { cookie: 'POESESSID='+ POE_SSID } })
  )
};
