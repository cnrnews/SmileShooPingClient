const Router = require('koa-router');
const mongoose = require('mongoose');
let router = new Router();

router.get('/', async (ctx) => {
    ctx.body = '这是用户操作首页';
})
router.post('/register', async (ctx) => {
    console.log('1'+ctx.request.body);
    //取得Model
    const User = mongoose.model('User')
    //把从前端接收的POST数据封装成一个新的user对象
    let newUser = new User(ctx.request.body)
    //用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
    await newUser.save().then(() => {
        //成功返回code=200，并返回成功信息
        console.log('1')
        ctx.body = {
            code: 200,
            message: '注册成功'
        }
    }).catch(error => {
        //失败返回code=500，并返回错误信息
        console.log('2' + error)
        ctx.body = {
            code: 500,
            message: error
        }
    })
})
//用户登录
router.post('/login', async (ctx) => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    console.log(ctx.request.body);
    //是否存在此用户
    //1.用户检索
    let User = mongoose.model('User');
    await User.findOne({ username: username }).exec().then(async (result) => {
        if (result) {
            //2.密码比对
            let tmpUser = new User();
            console.log(password+":"+result.password)
            await tmpUser.comparePassword(password, result.password)
                .then((isMatch) => {
                    ctx.body = {
                        code: 200,
                        message: isMatch
                    }
                }).catch(err => {
                    ctx.body = {
                        code: 500,
                        message: err
                    }
                })
        } else {
            ctx.body = {
                code: 201,
                message: '用户不存在'
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            message: err
        }
    })
})

module.exports = router;