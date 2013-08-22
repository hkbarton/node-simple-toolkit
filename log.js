/*
   Log Utility 
   Auto rolling when log file size is bigger than 10mb,
   we can change variable rollingSize to change this size.
*/
var fs = require('fs');

var logDir = 'log',
    logFileName = 'log',
    logDirExists = false,
    rollingSize = 10485760, // 10 mb
    rollingFlag = false;

function rollingLog(){
    if (rollingFlag){
        return;
    }
    rollingFlag = true;
    fs.stat(logDir + '/' + logFileName, function(err, stats){
        if (err || stats.size < rollingSize){
            rollingFlag = false;
            return;
        }
        fs.readdir(logDir, function(err, files){
            var rollingNum = -1;
            err || files.forEach(function(file){
                var pos = file.lastIndexOf('.');
                var rnum = -1;
                if (pos > -1){
                    rnum = parseInt(file.substring(pos + 1,
                        file.length));
                }
                rollingNum = rnum > rollingNum ? rnum : rollingNum;
            });
            rollingNum++;
            fs.rename(logDir + '/' + logFileName,
                logDir + '/' + logFileName + '.' + 
                rollingNum.toString());
            rollingFlag = false;
        });
    });
}

function log(level, msg){
    if (!logDirExists){
        if (!fs.existsSync(logDir)){
            fs.mkdirSync(logDir);
        }
        logDirExists = true;
    }
    fs.appendFile(logDir + '/' + logFileName,
        (new Date()).toString() + '\t' +level + '\t' + msg + '\r\n',
        function(err){
            !err || console.error(err);
            rollingLog();
        });
}

exports.e = function(msg){
    log('ERRO', msg); 
}

exports.i = function(msg){
    log('INFO', msg);
}

exports.w = function(msg){
    log('WARN', msg);
}

exports.d = function(msg){
    log('DEBG', msg);
}
