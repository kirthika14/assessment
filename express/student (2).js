const Product=require('../../model/product')
const multer=require('multer')
const storage=multer.diskStorage({
    destination:'./public/uploads/',
    filename:function(req,file,cb){
        cb(null,file.filename+ '-' + Date.now()+ file.originalname);
    }


})

//file filter
const fileFilter=(req,file,cb)=>{
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        cb(null,true);//upload file only when it meetsthe condition
    }
    else{
        cb(null,false);
    }
}
const upload=multer({storage:storage, limits:{
    fileSize:1024*1024*8 // accepts only of file 8Mega Bytes
},
fileFilter:fileFilter
})


module.exports=function(router){
    router.get('/product',function(req,res){
        Product.find({},(err,product)=>{
        if(err){
            res.json({success:false,message:err});
        }
        else {
            if(!product){
                res.json({success:false, message:'No products'})
            }
            else {
                res.json({success:true,product:product});
            }
        }
    
    })
    })

    router.post('/product',upload.single('productimage'),function(req,res){
        console.log(req.file)
        let note=new Product(req.body)
        note.save(function(err,note){
            if(err){
                return res.status(400).json(err)
            }
            res.status(200).json(note)
        })
    })
    router.put('/product',(req,res)=>{
        if(!req.body._id){
            res.json({sucess:false,message:'No id provided'});

        }else{
            Product.findOne({_id:req.body._id},(err,standup)=>{
                if(err){
                    res.json({sucess:false,message:'No id provided'});
                }
                else{
                    standup.productname=req.body.productname;
                    standup.productdesc=req.body.productdesc;
                    standup.pproductprice=req.body.pproductprice;                   //while running   http://localhost:8081/api/Updatestandup
                    standup.manudate=req.body.manudate;
                    standup.expdate=req.body.expdate;
                    standup.barcode=req.body.barcode;
                    standup.productimage=req.file.path;
                    standup.save((err)=>{
                        if(err){
                            res.json({sucess:false,message:err});
                        }else{
                            res.json({sucess:true,message:'product updates!'});
                        }
                    })
                }
            })
        }
    })

    router.delete('/deleteproduct/:id',(req,res)=>{
                   
        if(!req.params.id){
            res.json({success:false,message:'No id provided'})
        }
        else{
            Product.findOne({_id:req.params.id},(err,product)=>{
             if(err){
                 res.json({success:false,message:'no id'});
             }else{
            product.remove((err)=>{
                if(err){
                    res.json({success:false,message:err})
                }
                else{
                    res.json({success:true,message:'deleted'})
                }
            })
        }
    
    })
}
    })
    
}
