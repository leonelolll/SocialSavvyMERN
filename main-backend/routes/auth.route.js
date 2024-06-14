    import express from "express";
    import { signin, signup, google, signout, authenticate, forgetpass, resetPassword } from "../controller/auth.controller.js";

    const router = express.Router();

    router.post("/register", signup);
    router.post("/signin", signin);
    router.post("/google", google);
    router.post("/signout", signout);
    router.post("/dashboard", authenticate);
    router.post("/google", google);
    router.post("/forgetpass", forgetpass);
    router.post("/resetpass/:token", resetPassword);

    export default router;