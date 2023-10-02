exports.generateInvertIndex_Id = async (feild, invevertIndex_Id, countAllKey, countRepetedKey) => {
    feild.keys.forEach(key => {
        let foundKey = invevertIndex_Id.find(str => str.key === key)
        if (foundKey) {
            const foundKeyIds = foundKey.ids.split(',');
            const foundId = foundKeyIds.find(element => element == feild.id);
            if (foundId == undefined) {
                foundKey.ids += `${feild.id},`
                foundKey.id_count += 1
            }
        } else {
            invevertIndex_Id.push({
                "key": key,
                "ids": `${feild.id},`,
                "id_count": 1,
            })
        }
    });
    return true;
}