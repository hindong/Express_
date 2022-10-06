"use Strict";

const express = require('express');
const {engine} = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 5000;

app.engine('handlebars', engine({
    extname: ".handlebars",
    defaultLayout: 'main',
}));

app.set('view engine', 'handlebars');
app.set("views", "./views");


app.use(express.static(__dirname + '/public'));

/*
  get 메서드는 기본적으로 routing을 해주는 메서드다
  이를 router로 분리해야하며
  route는 서로 다른 네트워크 간 데이터를 전송하고 전송한 데이트럴 받는 경로
  routing 은 엔드포인트의 정의 이다.
*/
app.get('/', (req, res) => res.render('home'));

app.get('/about', (req,res) => res.render('about')); 

// 미들웨어
// app.use 같은 경우에는 res의 모든경로를 통일해서 읽음
// /about/a /about/b 이걸 모두 동일하게 /about으로 읽기때문에
// 공통적인 에러부분을 핸들링 함.


app.use((req, res) => {
    res.status(404).render('404');
});

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).render('500');
});

app.listen(PORT, () => console.log
        (`Express started on http://localhost;${PORT};` + 
          `press Ctrl-C tp terminate.`));


