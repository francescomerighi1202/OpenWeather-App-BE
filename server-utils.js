import db from "./index.js";

async function signUp(name, username, email, hashedPassword) {
  try {
    await db.query(
      "INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4)",
      [name, username, email, hashedPassword]
    );
  } catch (error) {
    console.error("Errore nella registrazione: ", error);
  }
}

async function findUserByEmail(email) {
  try {
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return user.rows[0];
  } catch (error) {
    console.error("Errore nella ricerca dell'utente: ", error);
  }
}

async function findUserById(id) {
  try {
    const user = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (user.rows[0]) {
      return user.rows[0];
    }
  } catch (error) {
    console.error("Errore nella ricerca dell'utente: ", error);
  }
}

async function insertFavourite(city, userId) {
  try {
    await db.query("INSERT INTO favourites (city, user_id) VALUES ($1, $2)", [
      city,
      userId,
    ]);
  } catch (error) {
    console.error("Errore nell'inserimento del preferito: ", error);
  }
}

async function removeFavourite(id) {
  try {
    await db.query("DELETE FROM favourites WHERE id = $1", [id]);
  } catch (error) {
    console.error("Errore nella rimozione del preferito: ", error);
  }
}

async function getFavourites(userId) {
  try {
    const favourites = await db.query(
      "SELECT * FROM favourites WHERE user_id = $1",
      [userId]
    );
    return favourites.rows;
  } catch (error) {
    console.error("Errore nella ricerca dei preferiti: ", error);
  }
}

export {
  signUp,
  findUserByEmail,
  findUserById,
  insertFavourite,
  removeFavourite,
  getFavourites,
};
