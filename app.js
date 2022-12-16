//express 연결, 포트 연결, api연결 및 확인, DB연결
const express = require('express');  
const app = express();                   //express라는 모듈 자체를 호출. express라는 모듈 자체는 app 이라는 객체를 리턴해줌.
const port = 3006;
const postRouter = require('./routes/posts.js');
const commentRouter = require('./routes/comments.js');

app.use(express.json());

const mongoose = require('mongoose');
mongoose
  .connect(
    'mongodb+srv://test:sparta@cluster0.lwbd7w1.mongodb.net/?retryWrites=true&w=majority',
    {
    }
  )
  .then(() => console.log('MongoDB conected'))
  .catch((err) => {
    console.log(err);
  });


  app.use('/posts', postRouter);        // '/posts'로 시작하는 주소들에게 postRouter라고 하는 이름의 미들웨어를 적용하겠다.
  app.use('/comments', commentRouter); //  '/commets'로 시작하는 주소들에게 commentRouter라고 하는 이름의 미들웨어를 적용하겠다. 

  // 404 에러처리
  app.use(function (req, res, next) {
    res.status(404).send({ what:'페이지'}) 
  })
  
  // 500 에러처리
  app.use(function (req, res, next) {
    res.status(500).send({ message:'페이지에 접속할 수 없습니다.'})
  })

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸습니다.');
});
