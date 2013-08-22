/* 
    Configuration Utility
*/
var fs = require('fs'),
    path = require('path'),
    configObj = null;

if (!configObj){
    // read config file
    var env = 'debug'; 
    try{
        env = fs.readFileSync(path.join(__dirname, 'env'), {encoding:'utf8'});
        env = env.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '');
    }catch(e){
        env = 'debug';
    }
    configObj = {
        isRelease: function(){
            return env=='release';
        }
    };
    var configContent = fs.readFileSync(path.join(__dirname, 'config.json'), {
        encoding: 'utf8'
    });
    var rawConfigObj = JSON.parse(configContent);
    for(var key in rawConfigObj){
        readConfig(key, rawConfigObj[key], configObj);
    }
}

function readConfig(rawKey, rawValue, config){
    if (typeof rawValue!='object'){
        config[rawKey] = rawValue;
    }else{
        if (rawKey=='debug' || rawKey=='release'){
            if (rawKey==env){
                for(var key in rawValue){
                    readConfig(key, rawValue[key], config);
                }
            }
        }else{
            config[rawKey] = {};
            for(var key in rawValue){
                readConfig(key, rawValue[key], config[rawKey]);
            }
        }
    }
}

module.exports = configObj;
