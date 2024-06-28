import connection from "../config/db.config";
import { User } from "../types/User";

const userModel = {
  // Crear usuario
  createUser: async (user: User): Promise<void> => {
    const query = `INSERT INTO users (name, lastname, username, email, password, status) 
    VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [user.name, user.lastname, user.username, user.email, user.password, user.status];
    await connection.execute(query, values);
  },

  // Obtener usuario por id
  getUserById: async (id: number): Promise<User | null> => {
    const [rows]: any = await connection.execute("SELECT * FROM users WHERE user_id = ?", [id]);
    if (rows.length) {
      return rows[0] as User;
    }
    return null;
  },

  // Obtener usuario por nombre de usuario
  getUserByUsername: async (username: string): Promise<User | null> => {
    const [rows]: any = await connection.execute("SELECT * FROM users WHERE username = ?", [username]);
    if (rows.length) {
      return rows[0] as User;
    }
    return null;
  },

  // Obtener usuario por usuario o correo
  getUserByCredentials: async (username: string, email: string): Promise<User | null> => {
    const [rows]: any = await connection.execute("SELECT * FROM users WHERE username = ? OR email = ?", [username, email]);
    if (rows.length) {
      return rows[0] as User;
    }
    return null;
  },

  // Actualizar usuario por id
  updateUser: async (id: number, user: Partial<User>): Promise<void> => {
    const fields = Object.keys(user).map(key => `${key} = ?`).join(", ");
    const values = Object.values(user);
    const query = `UPDATE users SET ${fields} WHERE user_id = ?`;
    await connection.execute(query, [...values, id]);
  },

  // Eliminar usuario por id
  deleteUser: async (id: number): Promise<void> => {
    const query = `DELETE FROM users WHERE user_id = ?`;
    await connection.execute(query, [id]);
  }
};

export default userModel;
