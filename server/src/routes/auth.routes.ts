import * as Express from "express";
import * as passport from "passport";
import * as AuthController from "../controllers/auth.controller";

const router = Express.Router();

router.get(
  "/google",
  (req, res, next) => {
    console.log("IN GOOGLE AUTH TRIGGER");
    next();
  },
  passport.authenticate("google", {
    scope: ["openid", "profile", "email"],
  })
);

router.get(
  "/google/callback",
  (req, res, next) => {
    console.log("IN GOOGLE AUTH callback");
    next();
  },
  passport.authenticate("google", {
    failureRedirect: "/auth/login",
    session: false,
  }),
  (req, res, next) => {
    console.log("IN GOOGLE AUTH callback after passport");
    next();
  },
  AuthController.handleOAuthRedirect
);

router.get(
  "/QWERTYoauth_redirect",
  (req, res, next) => {
    console.log("IN auth controller");
    next();
  },
  AuthController.oauthRedirect
);
router.get(
  "/QWERTYoauth_redirect/:token",
  (req, res, next) => {
    console.log("IN auth controller");
    next();
  },
  AuthController.oauthRedirect
);

router.get("/login", (_req, res: Express.Response) => {
  res.send("Auth fail");
});

// to be deleted
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req: Express.Request, res: Express.Response) => {
    console.log(req?.user ?? "no user data");
    res.send("Protected route, have access");
  }
);

export default router;
