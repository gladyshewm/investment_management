import { Router } from "express";
import userAPI from "../api/user.js";

export const authRouter = Router();

authRouter.post("/", async (req, res) => {
    const { email, password } = req.body;
    try {
        await userAPI.signIn(email, password);
        res.status(201).send("User signed in successfully");
    } catch (error) {
        console.error('Error signing in:', error.message);
        res.status(400).json({ error: error.message });
    }
});

authRouter.post("/reg", async (req, res) => {
    const { email, password } = req.body;
    try {
        await userAPI.signUp(email, password);
        res.status(201).send("User signed up successfully");
    } catch (error) {
        console.error('Error signing up:', error.message);
        res.status(400).json({ error: error.message });
    }
});

authRouter.get("/isloggedin", async (req, res) => {
    try {
        const user = await userAPI.isLoggedIn();
        if (user) {
            res.status(200).json({ isLoggedIn: true, user: user });
        } else {
            res.status(200).json({ isLoggedIn: false });
        }

    } catch (error) {
        console.error('Error checking user authentication:', error.message);
        res.status(500).json({ error: error.message });
    }
});

authRouter.post("/signout", async (req, res) => {
    try {
        await userAPI.signOut();
        res.status(200).json({ message: "User signed out successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

