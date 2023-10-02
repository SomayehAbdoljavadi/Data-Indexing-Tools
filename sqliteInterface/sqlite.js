const sqlite3 = require('sqlite3')
const Promise = require('bluebird')

function getConnection(dbFilePath, openingMode) {
  return new Promise((resolve, reject) => {
    const connection = new sqlite3.Database(dbFilePath, openingMode, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve(connection)
      }
    })
    const busyTimeout = 60000
    connection.configure("busyTimeout", busyTimeout)
    //connection.run( 'PRAGMA journal_mode = WAL;' );
  })

}

async function run(connection, sql) {
  return new Promise((resolve, reject) => {
    connection.run(sql, function (err) {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        resolve(this)
      }
    })
  })
}

module.exports = {
  getConnection,
  run,
}