import connection from "../config/db.config";
import { User } from "../types/User";
import { OkPacket } from 'mysql2';

const userModel = {
  // Crear usuario
  createUser: async (user: User): Promise<User | null> => {
    try {
      const query = `
        INSERT INTO users (name, lastname, username, email, password, status) 
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const values = [
        user.name,
        user.lastname,
        user.username,
        user.email,
        user.password,
        user.status || 'conectado', // establecer valor por defecto
      ];
  
      // Execute the query and await the result
      const [result] = await connection.execute<OkPacket>(query, values);
  
      // Check if the insertion was successful
      if (result.affectedRows === 1) {
        // If successful, return the user object with the inserted ID
        return { ...user, user_id: result.insertId } as User;
      } else {
        // Handle case where no rows were affected (insert failed)
        return null;
      }
    } catch (error) {
      // Handle any errors that occur during execution
      console.error('Error creating user:', error);
      throw error; // Optionally rethrow the error to handle it elsewhere
    }
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
