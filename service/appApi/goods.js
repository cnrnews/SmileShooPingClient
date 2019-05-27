const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');
const fs = require('fs');

//插入商品详情数据
router.get('/insertGoods', async (ctx) => {
    fs.readFile('./data/goods.json', 'utf8', (err, data) => {
        //转换
        data = JSON.parse(data);
        //循环存储
        const Goods = mongoose.model('Goods');
        data.map((value, index) => {
            let newGoods = new Goods(value);
            newGoods.save().then(() => {
                saveCount++;
            }).catch(err => {
            })
        })
    })
    ctx.body = '开始导入数据'
})

//插入商品大类
router.get('/insertCategory', async (ctx) => {
    //读取数据
    fs.readFile('./data/category.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        const Category = mongoose.model('Category');
        //循环存储
        data.RECORDS.map((value, index) => {
            let newCategory = new Category(value);
            newCategory.save().then(() => {
                insertCount++;
            }).catch(err => {
            })
        })
    })
    ctx.body = '开始导入数据'
})
//插入商品二级分类
router.get('/insertCategoryes', async (ctx) => {
    fs.readFile('./data/category_sub.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        const Category = mongoose.model('CategorySub');
        let count;
        data.RECORDS.map((value, index) => {
            let newCategory = new Category(value);
            newCategory.save().then(() => {
                count++;
            }).catch(err => {

            })
        })
        console.log('count=' + count);
    })
    console.log('开始导入数据')
})
//获取商品详情
router.post('/getDetailGoodsInfo', async (ctx) => {
    let goodsId = ctx.request.body.goodsId;
    const Goods = mongoose.model('Goods');
    console.log('goodsId='+goodsId)
    //查找数据
    try {
       let result= await Goods.findOne({ ID: goodsId }).exec();
        ctx.body = { code: 200, message: result }
    } catch (err) {
        ctx.body = { code: 500, message: err }
    }
})
//获取大类别数据
router.get('/getCategoryList', async (ctx) => {
    const Category = mongoose.model('Category');
    try {
        let result = await Category.find().exec();
        ctx.body = {
            code: 200,
            message: result
        }
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})
//读取小类别数据
router.post('/getCategorySubList', async (ctx) => {
    let categoryId = ctx.request.body.categoryId;
    const CategorySub = mongoose.model('CategorySub');
    try {
        let result =await CategorySub.find({ MALL_CATEGORY_ID: categoryId }).exec();
        ctx.body = { code: 200, message: result }
    } catch (err) {
        ctx.body = { code: 500, message: err }
    }

})
//根据商品类别获取商品列表
router.post('/getGoodsListByCategorySubID', async (ctx) => {
    let categorySubId =ctx.request.body.categorySubId ;
    const Goods = mongoose.model('Goods');
    try {
        let page=ctx.request.body.page;
        let num=10;//每页显示10条
        let start=(page-1)*num;
        let result = await Goods.find({ SUB_ID: categorySubId })
        .skip(start).limit(num).exec();
        console.log(result)
        ctx.body = { code: 200, message: result }
    } catch (err) {
        ctx.body = { code: 500, message: err }
    }

})
module.exports = router;