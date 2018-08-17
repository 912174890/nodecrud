var express=require('express');
var router=express.Router();
//引入数据库包
var db=require("./db.js");

// 查询
router.get('/',function (req,res,next) {
   db.query('select * from person',function (err,rows) {
       console.log(rows);
       if(err){
           res.render('persons',{title:'人员管理',datas:[]});// 跳转到"views/persons.html"
       }else{
           res.render('persons',{title:'人员管理',datas:rows});
       }
   })
});


//添加
router.get('/add',function (req,res) {
    res.render('add');
});
router.post('/add',function (req,res) {
    var name=req.body.name;
    var age=req.body.age;
    var professional=req.body.professional;
    db.query("insert into person(name,age,professional) values('"+name+"',"+age+",'"+professional+"')",function (err,rows) {
        if(err){
            res.end("添加失败"+err);
        }else{
            res.redirect("/persons")
        }
    })
});

//删除

router.get('/del/:id',function (req,res) {
    var id=req.params.id;
    db.query("delete from person where id="+id,function (err,rows) {
        if(err){
            res.end('删除失败',+err);
        }else{
            res.redirect("/persons")
        }
    });
});

//修改
//进入修改页面   findById
router.get('/toupdate/:id',function (req,res) {
    var id=req.params.id;
    console.log(id);
    db.query("select * from person where id="+id,function (err,rows) {
        if(err){
            res.end("进入修改页面失败"+err)
        }else{
            res.render("update",{datas:rows}); //进入修改页面
        }
    })
});
//执行修改
router.post('/update',function (req,res) {
    var id=req.body.id;
    var name=req.body.name;
    var age=req.body.age;
    var professional=req.body.professional;
    db.query("update person set name='"+name+"',age="+age+",professional='"+professional+"' where id="+id,function (err,rows) {
        if(err){
            res.end("修改失败"+err)
        }else{
            res.redirect("/persons")
        }
    })
});





module.exports=router;