const express = require('express');
const router = express.Router();
const Cart = require('../schemas/cart');

//카트 생성
router.post('/', async(req, res) => {
    try {
        // const {cartId} = req.params;
        const {user, password} = req.body; //사용자 입력란 => body에 입력하는 것이 없으면 생성x
        await Cart.create({user, password})
        // const Carts = await Cart.find({ cartId })
        // if (Carts.length === 0){
        //     throw Error 
        // }else{
        //     res.send("cart 생성 성공")
        // }
        res.send("cart 생성 성공") // try - catch 에서 응답은 필수!
    }catch(error){
     console.error(error)
     res.status(400).send("cart생성 API 오류")
    }
})

//카트 조회
router.get('/', async (req, res) => {
    try{
        // const {cartId} = req.params;
        await Cart.find({})
        if(Cart.length === 0){
            throw Error
        } else {
            res.send("카트 상세 조회 성공")
        }

    }catch(error){
        console.error(error)
        res.status(400).send("카트 상세 조회API 오류")
    }
})

//카트 수정
router.put('/:_id', async (req, res)=> {
    try{
        const {_id} = req.params;
        const {password} = req.body;
        const Carts = await Cart.find({_id });
        if (Cart.length === 0){
            throw Error
        } else {
            await Cart.updateOne({password:password})
            res.send("카트 수정 성공")
        }

    }catch(error){
        console.error(error)
        res.status(400).send("카트 수정 API 오류")
    }
})

//카트 삭제
router.delete('/:_id', async (req, res) => {
    try{
        const {_id} = req.params;
        const {password} = req.body;
        const Carts = await Cart.find ({_id});
        if (Cart.length === 0){
            throw Error
        } else {
            await Cart.deleteOne({ password:password})
            res.status(200).send("카트 삭제 성공")
        }

    }catch(error){
        console.error(error)
        res.status(400).send("카트 삭제 API 오류")
    }
})

module.exports = router;

// 404 vs 400
// 400 : 에러를 찾고 수정해야 하는 것 , 404: 경로/메소드 변경 필요
// 모든 API에는 res가 있어야 한다!
// req.body는 실제 유저가 입력하는 것