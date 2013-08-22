# node-simple-toolkit: Just a simple and rough toolkit I used in my code

Currently only 2 components in this toolkit, and I will update once I get new or better components. You can use or change it if you like.

## Config utility:

Write your JSON config file like below and save it as config.json

    {
        "db":{
            "mysql":{
                "debug":{
                   "host": "localhost",
                   "user": "root",
                   "database": "somedb",
                   "password": ""
                },
                "release":{
                   "host": "someserver",
                   "user": "someuser",
                   "database": "somedb",
                   "password": "somepass"
                }
            },
            "other":{
                "key": "value"
            }
        }
    }

Write a simple text file which indicate the current environment, there is only one word in this file, "debug" or "release". Then you can read configuration according to current environment setting like this:

var config = require('config.js');
console.log(config.db.mysql.host);


## Log utility

Very simple:

    var log = reuqire('log.js');
    log.i('...'); // log information
    log.w('...'); // log warning
    log.e('...'); // log error
    log.d('...'); // log debug

Log file will be generated in log directory, and it will rolling automatic once the file size is greater than 10mb, archieve log file will be names as log.x which x is a integer, such as log.1, file called 'log' is current, latest log file.

# Hope you like them.

