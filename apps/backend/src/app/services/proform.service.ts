import { Proform } from '../model/models/Proform';

// Create user
export async function createProform(proformData) {
  try {
    const newProform = await Proform.create(proformData);
    return newProform;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating user');
  }
}
// Get all users
export async function getAllProforms() {
  return await Proform.findAll();
}

// Get a single user by ID
export async function getProformById(id) {
  try {
    const proform = await Proform.findByPk(id);
    if (!proform) {
      throw new Error('Proform not found');
    }
    return proform;
  } catch (error) {
    console.error(error);
    throw new Error('Error getting proform');
  }
}
// Update a user by ID
export async function updateProform(id, body) {
  try {
    const [affectedCount, affectedRows] = await Proform.update(body, {
      where: { id },
      returning: true,
    });
    if (affectedCount === 0) {
      return { status: 404, message: 'Proform not found' };
    } else {
      return { status: 200, data: affectedRows[0] };
    }
  } catch (error) {
    console.error(error);
    return { status: 500, message: 'Proform updating user' };
  }
}
