import { sign } from 'jsonwebtoken';
import { User } from '../model/models/User';
import { compare } from 'bcrypt';
import { env } from 'process';

export class LoginService {
  async login(username: string, password: string): Promise<string> {
    // Check if user with given username exists
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error('Invalid username');
    }

    // Compare password hash with provided password
    const match = await compare(password, user.password);
    if (!match) {
      throw new Error('Invalid  password');
    }

    // Return JWT token with user ID as payload
    return sign(
      { userId: user.id, userName: user.realname, userEmail: user.email },
      env.JWT_SECRET
    );
  }
}
