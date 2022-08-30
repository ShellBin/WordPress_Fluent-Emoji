const fs = require("fs")

const emojiList = fs.readdirSync("./assets")
const dirSVG = './plugin/assets/SVG/'
const dirPNG = './plugin/assets/PNG/'
const listSVG = []
const listPNG = []
let counter = 0

const Generate_SVG_version = true
const Generate_PNG_version = false

function getUnicodes(emoji) {
    const jsonData = JSON.parse(fs.readFileSync(`./assets/${emoji}/metadata.json`, "utf8"))
    if (jsonData.hasOwnProperty("unicodeSkintones")) {
        const unicodeSkintones = jsonData.unicodeSkintones
        for (let i = 0; i < unicodeSkintones.length; i++) {
            unicodeSkintones[i] = unicodeSkintones[i].replaceAll(' ', '-')
        }
        return unicodeSkintones
    } else {
        return [jsonData.unicode.replaceAll(' ', '-')]
    }
}

function nameFormatting(emojiName) {
    return emojiName.replaceAll(' ','_').toLowerCase()
}

function mkPHPArr(arr) {
    let phpArray = `[`
    for (let i = 0; i<arr.length; i++) {
        phpArray = phpArray + `"${arr[i]}"`
        if (i < arr.length - 1) {
            phpArray = phpArray + ','
        }
    }
    return phpArray + ']'
}

function checkMkFile(emoji) {
    counter ++
    if (emoji === emojiList[emojiList.length]) {
        fs.writeFileSync('./plugin/listSVG.php', `$listSVG = ${mkPHPArr(listSVG)}`)
        fs.writeFileSync('./plugin/listPNG.php', `$listPNG = ${mkPHPArr(listPNG)}`)
    }
    console.log(`${counter} emoji processed`)
}

function process(emoji) {
    unicodes = getUnicodes(emoji)
    if (unicodes.length === 1) {
        // Simple Emoji
        if (Generate_SVG_version) {
            fs.copyFile(`./assets/${emoji}/Color/${nameFormatting(emoji)}_color.svg`, `${dirSVG}${unicodes[0]}.svg`, (err) => {
                if (err) throw err
                listSVG.push(unicodes[0])
                checkMkFile(emoji)
            })
        }
        if (Generate_PNG_version) {
            fs.copyFile(`./assets/${emoji}/3D/${nameFormatting(emoji)}_3d.png`, `${dirPNG}${unicodes[0]}.png`, (err) => {
                if (err) throw err
                listPNG.push(unicodes[0])
                checkMkFile(emoji)
            })
        }
    } else if (unicodes.length === 6) {
        // Skin tones Emoji
        if (Generate_SVG_version) {
            for (let i = 0; i < unicodes.length; i ++) {
                if (fs.existsSync(`./assets/${emoji}/Color`)) {
                    fs.copyFile(`./assets/${emoji}/Color/${nameFormatting(emoji)}_color.svg`, `${dirSVG}${unicodes[i]}.svg`, (err) => {
                        if (err) throw err
                        listSVG.push(unicodes[i])
                        checkMkFile(emoji)
                    })
                } else {
                    switch (i) {
                        case 0:
                            fs.copyFile(`./assets/${emoji}/Default/Color/${nameFormatting(emoji)}_color_default.svg`, `${dirSVG}${unicodes[i]}.svg`, (err) => {
                                if (err) throw err
                                listSVG.push(unicodes[i])
                                checkMkFile(emoji)
                            })
                            break
                        case 1:
                            fs.copyFile(`./assets/${emoji}/Light/Color/${nameFormatting(emoji)}_color_light.svg`, `${dirSVG}${unicodes[i]}.svg`, (err) => {
                                if (err) throw err
                                listSVG.push(unicodes[i])
                                checkMkFile(emoji)
                            })
                            break
                        case 2:
                            fs.copyFile(`./assets/${emoji}/Medium-Light/Color/${nameFormatting(emoji)}_color_medium-light.svg`, `${dirSVG}${unicodes[i]}.svg`, (err) => {
                                if (err) throw err
                                listSVG.push(unicodes[i])
                                checkMkFile(emoji)
                            })
                            break
                        case 3:
                            fs.copyFile(`./assets/${emoji}/Medium/Color/${nameFormatting(emoji)}_color_medium.svg`, `${dirSVG}${unicodes[i]}.svg`, (err) => {
                                if (err) throw err
                                listSVG.push(unicodes[i])
                                checkMkFile(emoji)
                            })
                            break
                        case 4:
                            fs.copyFile(`./assets/${emoji}/Medium-Dark/Color/${nameFormatting(emoji)}_color_medium-dark.svg`, `${dirSVG}${unicodes[i]}.svg`, (err) => {
                                if (err) throw err
                                listSVG.push(unicodes[i])
                                checkMkFile(emoji)
                            })
                            break
                        case 5:
                            fs.copyFile(`./assets/${emoji}/Dark/Color/${nameFormatting(emoji)}_color_dark.svg`, `${dirSVG}${unicodes[i]}.svg`, (err) => {
                                if (err) throw err
                                listSVG.push(unicodes[i])
                                checkMkFile(emoji)
                            })
                            break
                        default:
                            console.error(`Too many items (SVG): ${emoji}`)
                            checkMkFile(emoji)
                    }
                } 
            }
        }
        if (Generate_PNG_version) {
            for (let i = 0; i < unicodes.length; i ++) {
                if (fs.existsSync(`./assets/${emoji}/3D`)) {
                    fs.copyFile(`./assets/${emoji}/3D/${nameFormatting(emoji)}_3d.png`, `${dirPNG}${unicodes[i]}.png`, (err) => {
                        if (err) throw err
                        listPNG.push(unicodes[i])
                        checkMkFile(emoji)
                    })
                } else {
                    switch (i) {
                        case 0:
                            fs.copyFile(`./assets/${emoji}/Default/3D/${nameFormatting(emoji)}_3d_default.png`, `${dirPNG}${unicodes[i]}.png`, (err) => {
                                if (err) throw err
                                listPNG.push(unicodes[i])
                                checkMkFile(emoji)
                            })
                            break
                        case 1:
                            fs.copyFile(`./assets/${emoji}/Light/3D/${nameFormatting(emoji)}_3d_light.png`, `${dirPNG}${unicodes[i]}.png`, (err) => {
                                if (err) throw err
                                listPNG.push(unicodes[i])
                                checkMkFile(emoji)
                            })
                            break
                        case 2:
                            fs.copyFile(`./assets/${emoji}/Medium-Light/3D/${nameFormatting(emoji)}_3d_medium-light.png`, `${dirPNG}${unicodes[i]}.png`, (err) => {
                                if (err) throw err
                                listPNG.push(unicodes[i])
                                checkMkFile(emoji)
                            })
                            break
                        case 3:
                            fs.copyFile(`./assets/${emoji}/Medium/3D/${nameFormatting(emoji)}_3d_medium.png`, `${dirPNG}${unicodes[i]}.png`, (err) => {
                                if (err) throw err
                                listPNG.push(unicodes[i])
                                checkMkFile(emoji)
                            })
                            break
                        case 4:
                            fs.copyFile(`./assets/${emoji}/Medium-Dark/3D/${nameFormatting(emoji)}_3d_medium-dark.png`, `${dirPNG}${unicodes[i]}.png`, (err) => {
                                if (err) throw err
                                listPNG.push(unicodes[i])
                                checkMkFile(emoji)
                            })
                            break
                        case 5:
                            fs.copyFile(`./assets/${emoji}/Dark/3D/${nameFormatting(emoji)}_3d_dark.png`, `${dirPNG}${unicodes[i]}.png`, (err) => {
                                if (err) throw err
                                listPNG.push(unicodes[i])
                                checkMkFile(emoji)
                            })
                            break
                        default:
                            console.error(`Too many items (PNG): ${emoji}`)
                            checkMkFile(emoji)
                    } 
                }
            }
        }
    } else {
        console.error(`Unknown type: ${emoji}`)
        checkMkFile(emoji)
    }
}

for(let item of emojiList) {
    process(item)
}
