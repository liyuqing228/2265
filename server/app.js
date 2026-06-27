const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// 连接本地数据库
const db = new Database('./users.db');
console.log('数据库连接成功');

// 用户表：新增昵称nickname字段
db.exec(`CREATE TABLE IF NOT EXISTS user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  nickname TEXT DEFAULT '匿名用户'
)`);

// 面试记录表，绑定用户ID，存储历史记录
db.exec(`CREATE TABLE IF NOT EXISTS record (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  uid INTEGER,
  content TEXT,
  createTime TEXT,
  FOREIGN KEY(uid) REFERENCES user(id)
)`);

// 1. 注册接口
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.json({ code: 400, msg: '账号密码不能为空' });
  const existUser = db.prepare(`SELECT * FROM user WHERE username = ?`).get(username);
  if (existUser) return res.json({ code: 401, msg: '该账号已被注册' });
  db.prepare(`INSERT INTO user(username, password) VALUES(?,?)`).run(username, password);
  res.json({ code: 200, msg: '注册成功，请去登录' });
});

// 2. 登录接口（返回完整用户信息）
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = db.prepare(`SELECT * FROM user WHERE username = ?`).get(username);
  if (!user) return res.json({ code: 401, msg: '账号不存在' });
  if (user.password !== password) return res.json({ code: 402, msg: '密码错误' });
  res.json({ code: 200, msg: '登录成功', data: user });
});

// 3. 获取用户信息（ID、昵称）
app.post('/getUserInfo', (req, res) => {
  const { username } = req.body;
  const user = db.prepare(`SELECT id,username,nickname FROM user WHERE username = ?`).get(username);
  res.json({ code:200, data:user });
});

// 4. 修改昵称接口
app.post('/editNick', (req, res) => {
  const { username, nick } = req.body;
  db.prepare(`UPDATE user SET nickname = ? WHERE username = ?`).run(nick, username);
  res.json({ code:200, msg:'昵称修改成功' });
});

// 5. 保存面试记录接口
app.post('/addRecord', (req, res) => {
  const { uid, content } = req.body;
  const time = new Date().toLocaleString();
  db.prepare(`INSERT INTO record(uid,content,createTime) VALUES(?,?,?)`).run(uid, content, time);
  res.json({ code:200, msg:'记录保存成功' });
});

// 6. 查询当前用户所有面试记录
app.post('/getRecord', (req, res) => {
  const { uid } = req.body;
  const list = db.prepare(`SELECT * FROM record WHERE uid = ? ORDER BY id DESC`).all(uid);
  res.json({ code:200, data:list });
});

app.listen(port, () => {
  console.log(`后端服务运行在 http://localhost:${port}`);
});