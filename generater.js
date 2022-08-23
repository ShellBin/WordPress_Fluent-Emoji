const fs = require("fs")

const emojiList = fs.readdirSync("./assets")

function getUnicode(emoji) {
    const jsonFile = fs.readFileSync(`./assets/${emoji}/metadata.json`, "utf8")
    return JSON.parse(jsonFile).unicode
}

function copyFile(source, target) {
    try{
        fs.copyFileSync(source, target)
    } catch (err) {
        console.error(err)
    }
}

if (!fs.existsSync('emoji')){
    fs.mkdirSync('emoji');
}

for(let item of emojiList) {
    copyFile(`./assets/${item}/Color/${item.replaceAll(' ','_')}_color.svg`, `./emoji/${getUnicode(item)}.svg`)
}
