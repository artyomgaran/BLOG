require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const routes = require('./routes');

const port = 3001;
const app = express();

// Подключаем куки и JSON
app.use(cookieParser());
app.use(express.json());

// Маршруты API
app.use('/api', routes);

// Путь к папке Vite сборки
const staticPath = path.resolve(__dirname, '../frontend/dist');
app.use(express.static(staticPath));

// И в конце — index.html для SPA-маршрутов
app.get('/login', (req, res, next) => {
	// Отдаем index.html для всего остального (SPA)
	if (req.path.startsWith('/api')) return next(); // пропускаем API

	res.sendFile(path.join(staticPath, 'index.html'));
});

// Подключаемся к базе данных и запускаем сервер
mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
	app.listen(port, () => {
		console.log(`Server is running on port ${port}`);
	});
});
