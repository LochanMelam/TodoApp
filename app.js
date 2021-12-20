const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const todoCollection = require("./models/schema");
const session = require("express-session");
require("dotenv").config();

// db connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .once("open", () => {
    console.log("connected to mongodb......");
  })
  .on("error", (err) => {
    console.log("Error: ", err);
  });

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({ secret: "shhhhhh!", saveUninitialized: false, resave: false })
);

//template language
app.set("view engine", "pug");
app.set("views", "./views");

const signupRouter = require("./routes/signup");
const signinRouter = require("./routes/signin");
const signoutRouter = require("./routes/signout");
const authorizeRouter = require("./routes/authorize");
const homeRouter = require("./routes/home");
const apiRouter = require("./routes/todoApi");
const addTodo = require("./routes/addTodo");
const deleteTodo = require("./routes/deleteTodo");
const editTodo = require("./routes/editTodo");
const all = require("./routes/all");
const active = require("./routes/active");
const complete = require("./routes/complete");

app.use("/signup", signupRouter);
app.use("/signin", signinRouter);
app.use("/signout", signoutRouter);
app.use("/authorize", authorizeRouter);
app.use("/", homeRouter);
app.use("/api", apiRouter);
app.use("/add", addTodo);
app.use("/all", all);
app.use("/active", active);
app.use("/complete", complete);
app.use("/delete", deleteTodo);
app.use("/edit", editTodo);

app.get("*", (req, res) => {
  req.session.user ? res.redirect("/all") : res.redirect("/signin");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server running on port 3000...........");
});
