// OBJECTS


// SENDERS

document.getElementById('browse-button').addEventListener('click', (e) => {
    e.preventDefault()

    window.api.send('toMain:path')
})



// RECEIVERS

window.api.receive('fromMain:path', (data) =>{
    const selectedPath = data.filePaths[0]
    document.getElementById('selPath').value = selectedPath
})

// TESTED FUNCTIONS


// document.querySelector('form').addEventListener('submit', (e)=>{
//     e.preventDefault()
//     window.api.send('toMain:path', document.getElementById('selPath').value)
// })
// window.api.receive("fromMain:car", (data) => {
//     console.log(data);
// });
// window.api.receive("fromMain:person", (data) => {
//     for(let i =0; i < 3; i++){
//         console.log(data);
//     }
// });
// document.getElementById('selectPath').addEventListener('change', (e, data) => {
//     e.preventDefault()
//     let selectedPath = e.target.files[0].path.replace(/\\/g, "/");
//     let arr = selectedPath.split('/')
//     arr.pop()
//     document.getElementById('selPath').value = arr.join("/")
    
// })
// document.getElementById('testBtn').addEventListener('click', (e) =>{
//     e.preventDefault()
//     window.api.send('toMain:test')
// })

// TEST OBJECTS
// let person = {
//     name: 'Vasily',
//     surename: 'Ivanov',
//     age: 40
// }
// let car = {
//     brand: 'Honda',
//     color: 'Red',
//     model: 'civic'
// }

