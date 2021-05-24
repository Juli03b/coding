/** User class for message.ly */

const db = require("../db");
const bcrypt = require("bcrypt")
const BCRYPT_WORK_FACTOR = require("../config");

/** User of the site. */

class User {

  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({username, password, first_name, last_name, phone}) {
    const hashedPw = await bcrypt.hash(password, 12);
    const res = await db.query(`
    INSERT INTO users (username, password, first_name, last_name, phone, join_at, last_login_at)
    VALUES ($1, $2, $3, $4, $5, current_timestamp, current_timestamp)
    RETURNING username, password, first_name, last_name, phone;`, [username, hashedPw, first_name, last_name, phone]);

    return res.rows[0];
  }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) {
    const res = await db.query(`
    SELECT password
    FROM users
    WHERE username = $1;`, [username]);
    const encryptedPw = res.rows[0].password;
    
    return await bcrypt.compare(password, encryptedPw);
   }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) {
    const res = await db.query(`
    UPDATE users
    SET last_login_at = current_timestamp
    WHERE username = $1;`, [username]);
   }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() {
    const res = await db.query(`
    SELECT username, first_name, last_name, phone
    FROM users`);

    return res.rows;
   }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) {
    const res = await db.query(`
    SELECT username, first_name, last_name, phone, join_at, last_login_at
    FROM users
    WHERE username = $1`, [username]);

    return res.rows[0];
   }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) {
    const res = await db.query(`
    SELECT id, body, sent_at, read_at, u.first_name, u.last_name, u.phone, u.username
    FROM messages m JOIN users u ON m.to_username = u.username
    WHERE m.from_username = $1`, [username]);

    const messages = res.rows.map( row => {
      const {first_name, last_name, phone, username} = row;
      delete row.username;
      delete row.first_name;
      delete row.last_name;
      delete row.phone;

      row.to_user = {first_name, last_name, phone, username};

      return row;
    });

    return messages;
   }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {id, first_name, last_name, phone}
   */

  static async messagesTo(username) {
    const res = await db.query(`
    SELECT id, body, sent_at, read_at, u.first_name, u.last_name, u.phone, u.username
    FROM messages m JOIN users u ON m.from_username = u.username
    WHERE m.to_username = $1`, [username]);

    const messages = res.rows.map( row => {
      const {first_name, last_name, phone, username} = row;
      delete row.username;
      delete row.first_name;
      delete row.last_name;
      delete row.phone;

      row.from_user = {first_name, last_name, phone, username};

      return row;
    });

    return messages;
  }
}


module.exports = User;