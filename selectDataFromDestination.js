var insertInvertIndexInToDestination = require("./insertInvertIndexInToDestination")
var generateInvertIndex_Id_Keys = require("./generateInvertIndex_Id_Keys")
var generateInvertIndex_Id = require("./generateInvertIndex_Id")
const {
    table
} = require('console');
const {
    Pool
} = require('pg')
exports.selectDataFromDestination = async (jsonDataTable, MaxConnectionMinT, countAllKey, countRepetedKey) => {
    let offset = 0
    let invertIndex_Id_KeysToInsert = []
    let invertIndex_IdToInsert = []
    const pool = new Pool({
        idleTimeoutMillis: jsonDataTable.idleTimeoutMillis,
        connectionTimeoutMillis: jsonDataTable.connectionTimeoutMillis,
        host:jsonDataTable.host,
        Port: jsonDataTable.Port,
        database: jsonDataTable.DBName,
        Schema: jsonDataTable.SchemaName,
        user: jsonDataTable.user,
        password: jsonDataTable.password,
        max: MaxConnectionMinT
    })
    let client
    try {
        client = await pool.connect()
        while (offset < jsonDataTable.TableCount) {
            results = await client.query(`SELECT * FROM ${jsonDataTable.SchemaName}.${jsonDataTable.TableName} WHERE delete_date is NULL LIMIT ${jsonDataTable.TableLimit} OFFSET ${offset} `)
            offset += parseInt(jsonDataTable.TableLimit)
            if (jsonDataTable.MethodeInvertIndex === "invert_index_id_keys") {
                results.rows.forEach(async result => {
                    await generateInvertIndex_Id_Keys.generateInvertIndex_Id_Keys(result, invertIndex_Id_KeysToInsert, countAllKey, countRepetedKey)
                });
            } else {
                results.rows.forEach(async result => {
                    await generateInvertIndex_Id.generateInvertIndex_Id(result, invertIndex_IdToInsert, countAllKey, countRepetedKey)
                });
            }
        }
        if (jsonDataTable.MethodeInvertIndex === "invert_index_id_keys") {
            insertInvertIndexInToDestination.insertInvertIndex_Id_KeyInToDestination(invertIndex_Id_KeysToInsert, jsonDataTable.DestinationTableName, jsonDataTable.DestinationDB)
        } else {
            insertInvertIndexInToDestination.insertInvertIndex_IdInToDestination(invertIndex_IdToInsert, jsonDataTable.DestinationTableName, jsonDataTable.DestinationDB)
        }
    } catch (e) {
        console.log(e);
        return (null)
    } finally {
        client.release()
        return true
    }
}