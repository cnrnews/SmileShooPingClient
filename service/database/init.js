//koa 链接数据库操作
const mongoose = require('mongoose')
const db = "mongodb://localhost/smile-db"
const glob=require('glob')
const {resolve}=require('path')

mongoose.Promise = global.Promise

//一次性引入所有的Schema文件
exports.initSchemas = () =>{
    glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
}

exports.connect = () => {
    //连接数据库
    mongoose.connect(db);
    let maxConnectCount;
    return new Promise((resolve, reject) => {
        mongoose.connection.on('disconnected', () => {
            console.log('---------数据库连接断开------------');
            if (maxConnectCount <= 3) {
                maxConnectCount++;
                mongoose.connect(db);
            } else {
                reject();
                throw new Error('数据库出现问题，程序无法搞定，请人为修理......');
            }
        })

        mongoose.connection.on('error', (error) => {
            console.log('---------数据库连接出错---------------');
            if (maxConnectCount <= 3) {
                maxConnectCount++;
                mongoose.connect(db);
            } else {
                reject();
                throw new Error('数据库出现问题，程序无法搞定，请人为修理......');
            }
        })
        mongoose.connection.once('open', () => {
            console.log('---------数据库连接成功--------------');
            resolve();
        })
    });

}