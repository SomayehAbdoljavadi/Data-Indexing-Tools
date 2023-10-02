const sqlite = require('./sqlite')
const sqlite3 = require('sqlite3')

/*const tablesObject = {
  namespaces: {
    createTableQuery: 'CREATE TABLE IF NOT EXISTS namespaces (key TEXT,value TEXT,type TEXT)',
    CreateUniqueIndex: 'CREATE UNIQUE INDEX key_index ON invert_index (key)',
    orderBy: ''
  },
  configs: {
    createTableQuery: 'CREATE TABLE IF NOT EXISTS configs (host TEXT,port INTEGER,project TEXT,user TEXT,password TEXT,machine_type TEXT,priority INTEGER DEFAULT 0)',
    orderBy: ' ORDER BY priority'
  }
}

async function createTable(tableName) {
  const sql = tablesObject[tableName].createTableQuery
  const connection = await sqlite.getConnection(process.env.SQLITEPATH, sqlite3.OPEN_READWRITE)
  const result = await sqlite.run(connection, sql)
  return {
    result: result.lastID
  }
}*/

async function insertRowsInvertIndex_Id_Key(queryInvertIndexIdKey, destinationDB) {
  let connection = await sqlite.getConnection(destinationDB, sqlite3.OPEN_READWRITE)
  sqlite.run(connection, queryInvertIndexIdKey, function (err, result) {
    if (err) {
      console.log("---sqliteQuery---  ", err);
      throw err
    } else {
      console.log("---sqliteQuery---  ", result);
    }
  });

}

async function insertRowsInvertIndex_Id(queryInvertIndexId, destinationDB) {
  let connection = await sqlite.getConnection(destinationDB, sqlite3.OPEN_READWRITE)
  sqlite.run(connection, queryInvertIndexId, function (err, result) {
    if (err) {
      console.log("---sqliteQuery---  ", err);
      throw err
    } else {
      console.log("---sqliteQuery---  ", result);
    }
  });

}

module.exports = {
  //createTable,
  insertRowsInvertIndex_Id_Key,
  insertRowsInvertIndex_Id

}