const express = require('express');

const cors = require('cors');

const morgan = require('morgan');

const methodOverride = require("method-override");


const app = express();

// 미들웨어

app.use(cors);

app.use(methodOverride);

app.use(express.json());

app.use(morgan("dev"))


app.use((req, res, next) => {
  const err = new Error('존재하지 않는 API 경로입니다.')
  err.status = 404;//client측 문제 /잘못된 정보 전송 등
  // 500번대 server쪽 문제(server 터짐 등)
  next(err);
})

// express에서 에러 핸들러는 딱 하나 존재 가능(중앙적). (err, req, res, next)
app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({
      msg: err.message
    })
    return;
  }
  res.status(500).json({
    msg: "서버 내부에서 문제가 발생하였습니다."
  })
})

const Port = 3000;

app.listen(Port, () => {
  console.log(`API 서버가 ${Port}에서 요청을 기다리고 있습니다.`)
})


