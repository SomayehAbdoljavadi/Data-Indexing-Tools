exports.generateInvertIndex_Id_Keys = async (feild, invevertIndex_Id_Keys, countAllKey, countRepetedKey) => {
    feild.keys.forEach(key => {
        let foundKey = invevertIndex_Id_Keys.find(str => str.key === key)
        if (foundKey) {
            let newId = ',,,' + feild.id + ',,'
            let foundKeyIds = ',,,' + foundKey.ids
            foundKeyIds = foundKeyIds.match(/,,,[^,]*,,/g)
            const foundId = foundKeyIds.find(element => element == newId);
            if (foundId == undefined) {
                foundKey.ids += `${feild.id},,${feild.keys},,,`
                foundKey.id_count += 1
                foundKey.key_count += `,${feild.keys.length}`
            }
        } else {
            invevertIndex_Id_Keys.push({
                "key": key,
                "ids": `${feild.id},,${feild.keys},,,`,
                "id_count": 1,
                "key_count": `${feild.keys.length}`
            })
        }
    })
    return true;
}