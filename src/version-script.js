#!/usr/bin/node

const JSON = require('../package.json');
const { exec } = require('child_process');
const fs = require('fs');

const filePath = `Dependencies_report_${new Date()}.txt`

// node --run npm view {dep} version

const runConsoleLog = () => {

    let fileString = '';
     fs.writeFile(filePath, '', (err) => {
                if (err) console.log(err)
            })
    Object.keys(JSON.dependencies).map(d => {
        exec(`npm view ${d} version`, (error, stdout, stderr) => {
            const fileString = `${d} ${JSON.dependencies[d]} ${stdout} \n`
            fs.appendFile(filePath, fileString, (err) => {
                console.log("🚀 ~ err:", err)
                
            })

        });
    });
     console.log(fileString)

}

runConsoleLog();