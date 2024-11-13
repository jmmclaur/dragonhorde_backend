// dotenv
// express
// mongoose
// cors

// app
// port = 3001
// errors

// app.use(cors())
// app.options("*")
// { requestLogger, errorLogger }
// { validateUserBody, validateAuthenication }

// mongoose all

// signin
// signup

/////////
// app.use((error, req, res, next))
//require("dotenv").config();
//const express = require("express");
//const mongoose = require("mongoose");
//const cors = require("cors");

//const app = express();
//const { PORT = 3001 } = process.env;
//const { errors } = require("celebrate");

//const allowedOrigins = ["http://localhost:3001"];

//app.use(cors());
/*
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
); */
/*
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
); */
/*
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);


app.use(
  cors({
    origin: "*", // Allow all origins for testing
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
); */
/*
app.options(
  "*",
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
); */
///

/*
const { requestLogger, errorLogger } = require("./middlewares/logger");
const {
  validateUserBody,
  validateAuthentication,
} = require("./middlewares/validation");

mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://127.0.0.1:27017/dragonhorde_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json());

app.listen(PORT, () => {
  console.log("please");
  console.log(`Server is running on port ${PORT}`);
});

const { login, createUser } = require("./controllers/users");

const mainRouter = require("./routes/index");

app.use(express.json());
app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash");
  }, 0);
});
app.post("/signin", validateAuthentication, login);
app.post("/signup", validateUserBody, createUser);

app.use("/", mainRouter);

app.use(errorLogger);

app.use(errors());

app.use((error, req, res, next) => {
  res.status(error.statusCode).send({ message: error.message });
  next();
});
*/

//New Attempt
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");
const app = express();
const { PORT = 3001 } = process.env;
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/dragonhorde_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);
app.use(express.json());
app.use(cors());
app.use("/", mainRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
