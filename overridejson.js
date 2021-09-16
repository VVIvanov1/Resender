const path = require('path')
const fs = require('fs').promises

const file = path.join(__dirname, 'test.json')

let obj = {
    name: 'vlad',
    surename: 'petrov'
}

function changeJson(path2file, params) {
    fs.readFile(path2file)
        .then(body => JSON.parse(body))
        .then(json => {
            let keys = Object.keys(params)
            console.log(keys);
            keys.map(k => {
                json.person[k] = params[k]
            })
            console.log(json);
            return json
        })
        .then(json => JSON.stringify(json))
        .then(body => fs.writeFile(file, body))
        .catch(error => console.error())
}
changeJson(file, obj)

