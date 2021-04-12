import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import router from "./routes/index";
import { googleStrategySignUp } from "./database/config/googlePassportSignup";
import { googleStrategySignIn } from "./database/config/googlePassportSignin";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", router);
app.use(cors());
app.use(express.json());

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: process.env.COOKIE_KEY,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use("googleSignIn", googleStrategySignIn);
passport.use("googleSignUp", googleStrategySignUp);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get(
  "/auth/google/signin",
  passport.authenticate("googleSignIn", {
    scope: ["profile", "email"],
  }),
  (req, res) => {
    if (!req.user.error) {
      res.status(200).json(req.user);
    } else {
      res.status(404).json(req.user);
    }
  }
);

app.get(
  "/auth/google/signup",
  passport.authenticate("googleSignUp", {
    scope: ["profile", "email"],
  }),
  (req, res) => {
    if (!req.user.error) {
      res.redirect("/");
    } else {
      res.status(409).json(req.user);
    }
  }
);

app.get("/", (req, res) => {
  res.send("Welcome to Green Lamp world");
});

app.listen(port, () => {
  console.log(`Server Running on: ${port}`);
});

export default app;
