var fs = require("fs");
 
readDir(__dirname + '/src/assets/css/element-variables.scss');
 
function readDir(path) {  
    fs.readdir(path,function(err, dirContent) {
        if(!dirContent) {
            // 如果不是目录，那么尝试读取文件
            fs.readFile(path, function(err, data){
                if(err){
                    return console.log(err);
                }
                let newContent = replaceContent(data.toString());
                if (newContent !== data.toString()) {
                    fs.writeFile(path, newContent, function(err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log('替换成功');
                    }); 
                }
            });
            return;
        }
        dirContent.forEach(function(ele) {
            fs.stat(path+"/"+ele, function(err, info){
                if (info.isDirectory()) {
                    readDir(path+"/" + ele);
                } else if (info.isFile()) {
                    if (getFileType(ele) === 'scss' || getFileType(ele) === 'vue') {
                        console.log("file: " + ele);
                        fs.readFile(path+"/" + ele, function(err, data){
                            if(err){
                                return console.log(err);
                            }
                            let newContent = replaceContent(data.toString());
                            if (newContent !== data.toString()) {
                                fs.writeFile(path+"/" + ele, newContent, function(err) {
                                    if (err) {
                                        return console.log(err);
                                    }
                                }); 
                            }
                        });
                    }
                }
            });
        });        
    });
}
 
function getFileType(fileName) {
    var splitName = fileName.split('.');
    let splitLength = splitName.length;
    var type = splitName[splitLength - 1];
    return type;
}
 
function replaceContent(content) {
    content = pxToRem(content);
    return content;
}
 
function pxToRem(content) {
    return content.replace(/([:\s])(-?\d+.?\d?)px/g, '$1' + 'px2rem(' + '$2' + ')');
}
 
function remToPx(content) {
    return content.replace(/rem\((-?\d+.?\d?)\)/g, '$1' + 'px');
}