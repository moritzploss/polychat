import { User } from '../schemas/user';

const authenticateRequest = async (req, res): Promise<void> => {
  const { email, password } = req.body;

  await User.authenticate(email, password, (error: Error, user) => {
    if (error || !user) {
      return res
        .status(401)
        .json({ error: 'wrong email or password' });
    }

    return res.json({
      name: user.name,
      language: user.language,
      email: user.email,
      id: user.id,
    });
  });
};

export { authenticateRequest };
