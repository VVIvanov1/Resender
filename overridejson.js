const path = require('path')
const fs = require('fs').promises

const file = path.join(__dirname, 'test.json')

fs.readFile(file)
.then(body => JSON.parse(body))
.then(json => {
    json.person.name = 'Vladislav'
    return json
})
.then(json => JSON.stringify(json))
.then(body => fs.writeFile(file, body))
.catch(error => console.error())