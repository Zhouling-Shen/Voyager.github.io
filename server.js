const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const bodyParser = require("body-parser");
const express = require("express");

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://voyagergame-d0974-default-rtdb.firebaseio.com",
});

const csrfMiddleware = csrf({ cookie: true });

const PORT = process.env.PORT || 3000;
const app = express();

app.engine("html", require("ejs").renderFile);
app.use("/static", express.static("static"));
app.use("/scripts", express.static("scripts"));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrfMiddleware);

app.all("*", (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});

app.get("/login", function (req, res) {
  res.render("../views/login.html");
});

app.get("/signup", function (req, res) {
  res.render("../views/signup.html");
});

app.get("/teacherLogin", function (req, res) {
  res.render("../views/teacherLogin.html");
});

app.get("/teacherHome", function (req, res) {
  res.render("../views/teacherHome.html");
});

app.get("/teacherSignup", function (req, res) {
  res.render("../views/teacherSignup.html");
});

app.get("/teacherView", function (req, res) {
  res.render("../views/teacherView.html");
});

app.get("/profile", function (req, res) {
  const sessionCookie = req.cookies.session || "";

  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then(() => {
      res.render("../views/profile.html");
    })
    .catch((error) => {
      res.redirect("/login");
    });
});

// app.get("/addSubtract", function (req, res) {
//   const sessionCookie = req.cookies.session || "";

//   admin
//     .auth()
//     .verifySessionCookie(sessionCookie, true /** checkRevoked */)
//     .then(() => {
//       res.render("../views/addSubtract.html");
//     })
//     .catch((error) => {
//       res.redirect("/login");
//     });
// });


app.get("/", function (req, res) {
  res.render("../views/index.html");
});

app.post("/sessionLogin", (req, res) => {
  const idToken = req.body.idToken.toString();

  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        res.end(JSON.stringify({ status: "success" }));
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );
});

app.get("/sessionLogout", (req, res) => {
  res.clearCookie("session");
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
