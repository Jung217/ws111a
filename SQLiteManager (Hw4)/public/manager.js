async function sqlRun() {
    let cmd = document.getElementById('cmd').value//Input
    let resultJson = document.getElementById('result')//Output
    let r = await window.fetch(`/sqlcmd/${cmd}`)
    let obj = await r.json()//Convert to Json
    resultJson.innerText = JSON.stringify(obj, null, 2)//Put Json into pre
}