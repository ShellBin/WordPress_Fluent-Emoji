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

function copyFile(source, target) {
    try{
        fs.copyFileSync(source, target)
    } catch (err) {
        console.error(err)
    }
}

function nameFormatting(emojiName) {
    return emojiName.replaceAll(' ','_').toLowerCase()
}

function process(emoji) {
    unicodes = getUnicodes(emoji)
    if (unicodes.length === 1) {
        // Simple Emoji
        if (Generate_SVG_version) {
            listSVG.push(unicodes[0])
            copyFile(`./assets/${emoji}/Color/${nameFormatting(emoji)}_color.svg`, `${dirSVG}${unicodes[0]}.svg`)
        }
        if (Generate_PNG_version) {
            listPNG.push(unicodes[0])
            copyFile(`./assets/${emoji}/3D/${nameFormatting(emoji)}_3d.png`, `${dirPNG}${unicodes[0]}.png`)
        }
    } else if (unicodes.length === 6) {
        // Skin tones Emoji
        if (Generate_SVG_version) {
            for (let i = 0; i < unicodes.length; i ++) {
                listSVG.push(unicodes[i])
                switch (i) {
                    case 0:
                        copyFile(`./assets/${emoji}/Default/Color/${nameFormatting(emoji)}_color_default.svg`, `${dirSVG}${unicodes[0]}.svg`)
                        break
                    case 1:
                        copyFile(`./assets/${emoji}/Light/Color/${nameFormatting(emoji)}_color_light.svg`, `${dirSVG}${unicodes[0]}.svg`)
                        break
                    case 2:
                        copyFile(`./assets/${emoji}/Medium-Light/Color/${nameFormatting(emoji)}_color_medium-light.svg`, `${dirSVG}${unicodes[0]}.svg`)
                        break
                    case 3:
                        copyFile(`./assets/${emoji}/Medium/Color/${nameFormatting(emoji)}_color_medium.svg`, `${dirSVG}${unicodes[0]}.svg`)
                        break
                    case 4:
                        copyFile(`./assets/${emoji}/Medium-Dark/Color/${nameFormatting(emoji)}_color_medium-dark.svg`, `${dirSVG}${unicodes[0]}.svg`)
                        break
                    case 5:
                        copyFile(`./assets/${emoji}/Dark/Color/${nameFormatting(emoji)}_color_dark.svg`, `${dirSVG}${unicodes[0]}.svg`)
                        break
                    default:
                        console.error(`Too many items (SVG): ${emoji}`)
                } 
            }
        }
        if (Generate_PNG_version) {
            for (let i = 0; i < unicodes.length; i ++) {
                listPNG.push(unicodes[i])
                switch (i) {
                    case 0:
                        copyFile(`./assets/${emoji}/Default/3D/${nameFormatting(emoji)}_3d_default.png`, `${dirPNG}${unicodes[0]}.png`)
                        break
                    case 1:
                        copyFile(`./assets/${emoji}/Light/3D/${nameFormatting(emoji)}_3d_light.png`, `${dirPNG}${unicodes[0]}.png`)
                        break
                    case 2:
                        copyFile(`./assets/${emoji}/Medium-Light/3D/${nameFormatting(emoji)}_3d_medium-light.png`, `${dirPNG}${unicodes[0]}.png`)
                        break
                    case 3:
                        copyFile(`./assets/${emoji}/Medium/3D/${nameFormatting(emoji)}_3d_medium.png`, `${dirPNG}${unicodes[0]}.png`)
                        break
                    case 4:
                        copyFile(`./assets/${emoji}/Medium-Dark/3D/${nameFormatting(emoji)}_3d_medium-dark.png`, `${dirPNG}${unicodes[0]}.png`)
                        break
                    case 5:
                        copyFile(`./assets/${emoji}/Dark/3D/${nameFormatting(emoji)}_3d_dark.png`, `${dirPNG}${unicodes[0]}.png`)
                        break
                    default:
                        console.error(`Too many items (PNG): ${emoji}`)
                } 
            }
        }
    } else {
        console.error(`Unknown type: ${emoji}`)
    }
    counter ++
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

for(let item of emojiList) {
    process(item)
    console.log(`${counter} emoji processed`)
}
fs.writeFileSync('./plugin/listSVG.php', `$listSVG = ${mkPHPArr(listSVG)}`)
fs.writeFileSync('./plugin/listPNG.php', `$listPNG = ${mkPHPArr(listPNG)}`)
