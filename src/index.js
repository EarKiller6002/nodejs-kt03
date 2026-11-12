const express = require('express');
const { port, prisma } = require('./config');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  server.close(() => process.exit(0));
});
