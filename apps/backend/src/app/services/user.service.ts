import { User } from '../model';

// Create user
export async function createUser(userData) {
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating user');
  }
}
// Get all users
export async function getAllUsers() {
  return await User.findAll();
}

// Get a single user by ID
export async function getUserById(id) {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Error getting user');
  }
}
// Update a user by ID
export async function updateUser(id, body) {
  try {
    const [affectedCount, affectedRows] = await User.update(body, {
      where: { id },
      returning: true,
    });
    if (affectedCount === 0) {
      return { status: 404, message: 'User not found' };
    } else {
      return { status: 200, data: affectedRows[0] };
    }
  } catch (error) {
    console.error(error);
    return { status: 500, message: 'Error updating user' };
  }
}

// Delete a user by ID
export async function deleteUserById(id, res) {
  try {
    const affectedCount = await User.destroy({ where: { id } });
    if (affectedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
