const express = require('express');
// const router = express.Router(); //모듈화 할 파일에 작성, 라우터에 많이 쓰임
const app = express();
const port = 3000;
const postRouter = require('./routes/posts');
const commentRouter = require('./routes/comments');
const cartRouter = require('./routes/cart');

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

app.use('/posts', postRouter);
app.use('/comments', commentRouter);
app.use('/cart', cartRouter);

app.listen(port, () => {
    console.log(port, '포트가 열렸습니다.')
});