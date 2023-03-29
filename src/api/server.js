const express = require('express'); // yarn add express
const cors = require('cors'); // yarn add cors
const mysql = require('mysql'); // yarn add mysql
const app = express();
const PORT = 3001; // 포트번호 설정

// MySQL 연결
const db = mysql.createConnection({
  host: 'localhost', // 호스트
  user: 'capsid', // 데이터베이스 계정
  password: 'capspw', // 데이터베이스 비밀번호
  database: 'capstonedb', // 사용할 데이터베이스
});

app.use(
  cors({
    origin: '*', // 출처 허용 옵션
    credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200, // 응답 상태 200으로 설정
  })
);

// post 요청 시 값을 객체로 바꿔줌
app.use(express.urlencoded({ extended: true }));

// 서버 연결 시 발생
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

// 실행할 쿼리문들 아래에 작성!
app.get('/api/image_upload', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');

  const getImageinfo = 'SELECT * FROM imageinfo';

  db.query(getImageinfo, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});
