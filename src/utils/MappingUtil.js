const dict = require('../api/modules/dict.api')

export function getMapping(dictType){
    let params = {
        type: dictType
    }
    let map = {}
    dict.findByType(params).then(res => {
        for (let i = 0; i < res.length; i++) {
            map[res[i].value] = res[i].label
        }
    })
    return map;
}
