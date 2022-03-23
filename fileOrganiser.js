// console.log("ravi")

// let inputArr = process.argv;
// ["pathToNode", "pathTofile", "input passed in terminal"];
// console.log(inputArr);
// let input = inputArr[2];
// console.log(input);

let fs = require("fs");
let path = require("path");

let folderPath = process.argv[2];

// another way to take folderpath
// let folderPath = path.join(__dirname,"Download")

let folderExit = fs.existsSync(folderPath);
// console.log(folderPath)

let extension = {
  Audio: [".mp3"],
  Video: [".mp4", ".mkv"],
  Document: [".doc", ".xlsx", ".pdf", ".txt"],
  Image: [".jpeg", ".png", ".gif", ".jpg"],
  Software: [".exe"],
};
if (folderExit) {
  // we will code
  // console.log("path is valid")
  let files = fs.readdirSync(folderPath);

  for (let i = 0; i < files.length; i++) {
    let ext = path.extname(files[i]);
    let folderName = giveNameOfFolder(ext);
    // console.log("Ext-->", ext, "folder--", folderName);
    let pathOfFolder = path.join(folderPath, folderName); //path to create folder

    let exist = fs.existsSync(pathOfFolder);
    if (exist) {
        moveFile(folderPath,pathOfFolder,files[i]);
    } else {
      fs.mkdirSync(pathOfFolder);
      moveFile(folderPath,pathOfFolder,files[i]);
    
    }
  }
} else {
  console.log("Please Enter a valid path");
}

function giveNameOfFolder(ext) {
  for (let key in extension) {
    let extArr = extension[key];
    for (let i = 0; i < extArr.length; i++) {
      if (extArr[i] == ext) {
        return key;
      }
    }
  }
  return "other";
}

function moveFile(folderpath, pathOfFolder, fileName) {
  let sourcePath = path.join(folderpath, fileName);
  let destinationPath = path.join(pathOfFolder, fileName);
  fs.copyFileSync(sourcePath, destinationPath);
  fs.unlinkSync(sourcePath);
}
