const sqliteQuery = require('./sqliteInterface/sqliteQuery')
exports.insertInvertIndex_Id_KeyInToDestination = (invertIndex_Id_KeyToInsert, destinationTableName, destinationDB) => {
    let querysInvertIndexIdKey = []
    invertIndex_Id_KeyToInsert.forEach(async (result) => {
        if (result.key=="sejamStatus_accept"){
           
            console.log(result.ids.split(",,,").length - 1);
        }
        querysInvertIndexIdKey.push(`INSERT INTO ${destinationTableName} (key,ids,id_count,key_count) VALUES ('${result.key}', '${result.ids}',${result.id_count},'${result.key_count}')`)
    })
    Promise.all(querysInvertIndexIdKey.map(async (queryInvertIndexIdKey) => {
            await sqliteQuery.insertRowsInvertIndex_Id_Key(queryInvertIndexIdKey, destinationDB)
        })).then(async result => {})
        .catch(function (error) {
            console.log(error);
        })
}
exports.insertInvertIndex_IdInToDestination = (invertIndex_IdToInsert, destinationTableName, destinationDB) => {
    let querysInvertIndexId = []
    invertIndex_IdToInsert.forEach(async (result) => {
        querysInvertIndexId.push(`INSERT INTO ${destinationTableName} (key,ids,id_count) VALUES ('${result.key}', '${result.ids}',${result.id_count})`)
    })
    Promise.all(querysInvertIndexId.map(async (queryInvertIndexId) => {
            await sqliteQuery.insertRowsInvertIndex_Id(queryInvertIndexId, destinationDB)
        })).then(async result => {

        })
        .catch(function (error) {
            console.log(error);
        })
}