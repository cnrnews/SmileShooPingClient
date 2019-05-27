const Koa = require('koa');
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const mongoose = require('mongoose')
const user = require('./appApi/User.js')
const goods=require('./appApi/goods.js')
const { connect, initSchemas } = require('./database/init.js')

const app = new Koa();

app.use(bodyParser())
app.use(cors())

let router = new Router();
//装在所有子路由
router.use('/user', user.routes());
router.use('/goods',goods.routes());
//装在路由中间件
app.use(router.routes(), router.allowedMethods())
    //立即执行函数
    ; (async () => {
        await connect()
        initSchemas()
        // const User = mongoose.model('User')
        // let oneUser = new User({ userName: 'jspang3', password: '123456' })
        // oneUser.save().then(() => {
        //     console.log('插入成功')
        // })
        // let users = await User.findOne({}).exec()
        // console.log('------------------')
        // console.log(users)
        // console.log('------------------')
    })();
// app.use(async (ctx) => {
//     ctx.body = '<h1>hello koa</h1>'
// })
app.listen(3000, () => {
    console.log('server listening 3000 port')
})