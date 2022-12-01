const express = require('express'); 
const router = express.Router();    
const mongoose = require('mongoose');
const Post = require('../schemas/post.js');           // '../'이건 부모폴더로 이동해서 경로 이동

//게시글 조회
router.get('/', async(req,res) => {

   const posts = await Post.find().sort({_id:-1});    
   res.send(posts);
});

//게시글 작성 
router.post('/', async(req,res,next) => {
    try{                 
        const {user, password, title, content} = req.body;
        await Post.create({user, password, title, content})
        res.json({message :'게시글 작성이 완료되었습니다.'})
    } catch(error){
        next(error)
    }
})

//게시글 상세 조회 
router.get('/:postId', async(req,res,next) => {
    try{  
        const {postId} = req.params
        const posts = await Post.find({_id:postId})
        if (posts.length===0){
            return res.status(400).send({ err: "해당 게시글은 없습니다." });
        }else{
            res.json({postlist : posts})
        }
    } catch(error){
        next(error)
    }
})


//게시글수정 updateOne 
router.put('/:postId', async(req,res,next) => {

    try {
        const {postId} = req.params
        const {title, content,password} = req.body    

        const posts = await Post.find({_id:postId})
        if (posts.length === 0) {           
            return  res.status(400).send({ err: "invalid userId"});
        } else {
            await Post.updateOne({_id:postId, password:password},{title , content});
            res.json({message:'게시글 수정이 완료되었습니다.'})
        }       
    } catch(error){
        next(error)
    }    
    
})


router.delete('/:postId', async(req,res,next) => {
    try {
        const {postId} = req.params
        const {password} = req.body;
        const posts = await Post.find({_id:postId})
        if (posts.length === 0) {           
            return  res.status(400).send({ err: "삭제할 게시글이 존재하지 않습니다."});
        } else {
        await Post.deleteOne({_id :postId, password:password});
        }
    }catch(error){
        next(error)
    }})
   



module.exports = router;