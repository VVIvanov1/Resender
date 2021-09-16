document.getElementById('browse-button').addEventListener('click', (e) => {
    e.preventDefault()

    document.getElementById('selectPath').click()
})

document.getElementById('selectPath').addEventListener('change', (e, data) => {
    e.preventDefault()
    let selectedPath = e.target.files[0].path.replace(/\\/g, "/");
    let arr = selectedPath.split('/')
    arr.pop()
    document.getElementById('selPath').value = arr.join("/")

})
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
    window.api.send('toMain:path', document.getElementById('selPath').value)
})