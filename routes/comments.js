const express = require('express');  
const router = express.Router();     
    
//댓글 생성 
const Comment = require('../schemas/comment.js');
router.post('/:postId', async(req,res,next) => {  
    try {
      const {postId}=req.params
      const {user, password, content} = req.body;
      await Comment.create({postId, user, password, content})
        const finder = await Post.find({_id : postId})
      if (finder.length===0){
        return res.status(400).send({ err: "해당 게시글이 존재하지 않습니다."})
      } else{
          res.json({message:'댓글 생성이 완료되었습니다.'})
        }   
      }catch(error){
      next(error)
    }})  
  
//댓글 목록 조회 
router.get('/:postId', async(req,res) => {
  try {
    const {postId} = req.params
    // const {user, password, content, commentId} = req.body;
    await Comment.find({postId : postId})
    if (Comment.length === 0){
      return res.status(400).send({err:"데이터 형식이 올바르지 않습니다."})
    } else {
      res.json({message:'댓글 목록이 조회되었습니다.'})
    }
    }catch(error){
    next(error)
  }})            
                                               
//댓글 수정
router.put('/:commentId', async(req,res) => {
  const {commentId} = req.params
  const {password, content} = req.body;
  try{
    const finder = await Comment.find({_id : commentId})
    if (finder.length === 0){
      return res.status(400).send({err:"데이터 형식이 올바르지 않습니다."})
    } else {
      await Comment.updateOne({_id:commentId, password:password},{content:content}) 
      res.json({message:'댓글이 수정되었습니다.'})
   }
  } catch(error){
   next(error) 
}})

//댓글 삭제
router.delete('/:commentId', async(req,res) => {
  const {commentId} = req.params
  const {password} = req.body
  try{
  const thatComment = await Comment.find({_id:postId})
        if (thatComment.length === 0) {           
            return  res.status(400).send({ err: "삭제할 댓글이 존재하지 않습니다."});
        } else {
        await Post.deleteOne({_id :commentId, password:password});
        }
    }catch(error){
        next(error)
    }})

module.exports = router;
