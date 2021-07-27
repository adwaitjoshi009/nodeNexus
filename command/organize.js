let path = require("path")
let fs = require("fs")

function organizeStuff(src) {
    // first check if src dir exists
    let srcExists = isDirectoryChecker(src)

    let destDir
    if (srcExists) {
        destDir = path.join(src, "organized")
        createDirIfNotPresent(destDir)

    }
    else {
        console.log("🙏 Please enter the correct path")
    }
    organizeFiles(src, destDir)
}

function organizeFiles(src, dest) {
    // read files from dir and check if those are files
    let filenamesArr = fs.readdirSync(src)


    for (let i = 0; i < filenamesArr.length; i++) {
        let SrcFile = path.join(src, filenamesArr[i])
        let isFile = isFileChecker(SrcFile)

        if (isFile) {
            let category = findCategory(filenamesArr[i])

            console.log(filenamesArr[i], "belongs to ", category)
            copyOrMoveFiles(SrcFile, dest, category)
        }
    }
}

let types = {
    media: ["3gp", "mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['sql', 'docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}
function findCategory(name) {


    let extension = extensionFinder(name)

    console.log(extension)
    for (let type in types) {
        let formats = types[type]
        console.log("types[type]", formats)
        for (let i = 0; i < formats.length; i++) {
            if (extension == formats[i]) {
                return type
            }
        }
    }
    return "other files"
}

function extensionFinder(name) {
    let extension = path.extname(name)
    extension = extension.slice(1)
    // to remove . 

    return extension
}

function copyOrMoveFiles(SrcFile, dest, category) {
    let categoryPath = path.join(dest, category)
    createDirIfNotPresent(categoryPath)

    let fileName = path.basename(SrcFile)
    let destFilePath = path.join(categoryPath, fileName)

    fs.copyFileSync(SrcFile, destFilePath)

    // for cut-paste, unlink source file path
    // fs.unlinkSync(SrcFilePath)
    console.log(fileName, "moved to ", category);
}

function createDirIfNotPresent(path) {
    if (fs.existsSync(path) == false) {
        fs.mkdirSync(path)
    }
}

function isFileChecker(filePath) {
    return fs.lstatSync(filePath).isFile()
}

function isDirectoryChecker(dirPath) {
    return fs.lstatSync(dirPath).isDirectory()
}
module.exports = {
    fnOrg: organizeStuff
}

