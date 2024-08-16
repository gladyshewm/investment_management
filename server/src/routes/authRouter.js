import { Router } from 'express';
import authService from '../services/authService.js';

export const authRouter = Router();

authRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.signIn(email, password);

  if (!user) {
    console.error('Error signing in');
    res.status(400).json({ error: 'Error signing in' });
  }

  res.status(201).send('User signed in successfully');
});

authRouter.post('/reg', async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.signUp(email, password);

  if (!user) {
    console.error('Error signing up');
    res.status(400).json({ error: 'Error signing up' });
  }

  res.status(201).send('User signed up successfully');
});

authRouter.post('/signout', async (_, res) => {
  const signOut = await authService.signOut();

  if (!signOut) {
    console.error('Error signing out');
    res.status(500).json({ error: 'Error signing out' });
  }

  res.status(200).json({ message: 'User signed out successfully' });
});

authRouter.get('/isloggedin', async (_, res) => {
  const user = await authService.isLoggedIn();

  if (user) {
    res.status(200).json({ isLoggedIn: true, user: user });
  } else {
    res.status(200).json({ isLoggedIn: false });
  }
});
