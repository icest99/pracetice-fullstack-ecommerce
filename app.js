require('dotenv').config();
require('express-async-errors');

// express
const express = require('express');

const app = express();

// packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

// database
const connectDB = require('./db/connect');

//  router
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const port = process.env.PORT || 5000;

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(morgan('tiny'));
app.use(express.json());
// to access cookies coming back from browser
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static('./public'));
app.use(fileUpload());

// routes
app.get('/', (req, res) => {
  res.send('HELLO! EXPRESssS');
});
app.get('/api/v1', (req, res) => {
  //   console.log(req.cookies);
  console.log(req.signedCookies);
  res.send('HELLO! EXPRESssS');
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

startServer();
