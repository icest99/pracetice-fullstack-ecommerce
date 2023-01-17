require('dotenv').config();
require('express-async-errors');

// express
const express = require('express');

const app = express();

// database
const connectDB = require('./db/connect');

const authRouter = require('./routes/authRoutes');

const port = process.env.PORT || 5000;

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// packages
const morgan = require('morgan');

app.use(morgan('tiny'));
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('HELLO! EXPRESssS');
});
app.use('/api/v1/auth', authRouter);

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
