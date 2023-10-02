var selectDataFromDestination = require("./selectDataFromDestination.js")
// var jsonDataTables = require('./jsonDataTables');
var jsonDataTables = require('../transferDataInfo-sqlite-test.json');
try {
  (async function readKeyIdFromDestination() {
    let TableCountMin = []
    let TableCountMax = []
    let invertIndex_insert = []
    let countAllKey = []
    let countRepetedKey = []
    let MaxConnection = 290

    jsonDataTables.forEach(jsonDataTable => {
      if (parseInt(jsonDataTable.TableCount) <= 1000000)
        TableCountMin.push(jsonDataTable)
      else
        TableCountMax.push(jsonDataTable)
    })
    let MaxConnectionMinT = MaxConnection / TableCountMin.length | 0
    Promise.all(TableCountMin.map(async (jsonDataTable) => {
        invertIndex_insert = await selectDataFromDestination.selectDataFromDestination(jsonDataTable, MaxConnectionMinT, countAllKey, countRepetedKey)

        return jsonDataTable
      })).then(async result => {
        //maxtabel
      })
      .catch(function (error) {
        console.log(error);
      })
  })()
} catch (error) {
  console.log(error)
}