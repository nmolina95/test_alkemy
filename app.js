const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const rememberUserMiddleware = require('./middlewares/rememberUserMiddleware')

// Set de motor de vistas
app.set('view engine', 'ejs');

// Set de carpeta public para archivos estáticos
app.use(express.static(__dirname + 'public'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(session({ secret: 'frase oculta'}));
app.use(cookieParser());

// Configuración del puerto donde se ejectura proyecto
app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'))

const homeRouter = require('./routes/home');
const authRouter = require('./routes/auth');
const moviesRouter = require('./routes/movies');
const charactersRouter = require('./routes/characters');
const genresRouter = require('./routes/genres');

app.use(rememberUserMiddleware);
app.use('/', homeRouter);
app.use('/auth', authRouter);
app.use('/movies/', moviesRouter);
app.use('/characters', charactersRouter);
app.use('/genres', genresRouter);