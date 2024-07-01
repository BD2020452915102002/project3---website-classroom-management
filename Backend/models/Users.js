const promisePool = require("../config/db");

module.exports = class Users {
    constructor(users) {
        this.id = users.id
        this.role_id = users.role_id
        this.user_code = users.user_code
        this.username = users.username
        this.password = users.password
        this.email = users.email
        this.name = users.name
        this.birth = users.birth
        this.gender = users.gender
        this.refresh_token = users.refresh_token
        this.status = users.status
    }

    static getAllUser = async () => {
        const [rows, fields] = await promisePool.query("SELECT * FROM users ")
        return rows
    };
    static getUserByID = async (id) => {
        const [rows, fields] = await promisePool.query(
            "SELECT * FROM users WHERE id = ?;",
            [id]
        )
        return rows[0]
    };
    static getUserByEmail = async (email) => {
        const [rows, fields] = await promisePool.query(
            "SELECT * FROM users WHERE email = ?;",
            [email]
        )
        return rows[0]
    };
    static getUserByUsername = async (username) => {
        const [rows, fields] = await promisePool.query(
            "SELECT * FROM users WHERE username = ?;",
            [username]
        )
        return rows[0]
    };
    static createUser = async ({user, idUser}) => {
        const [result] = await promisePool.query(
            "INSERT INTO users (id, role_id,user_code, username, password, email, name, birth, gender,status,created_at, updated_at) VALUES (?, (SELECT id FROM roles WHERE role_name = ?),?, ?, ?, ?, ?, ?, ?, ?,CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);",
            [
                idUser,
                user.role_name,
                user.user_code,
                user.username,
                user.password,
                user.email,
                user.name,
                user.birth,
                user.gender,
                user.status
            ]
        );
        const newData = {id: idUser, ...user};
        return newData;
    };
    static updateUser = async ({user, id}) => {
        const [result] = await promisePool.query(
            "UPDATE users SET role_id = (SELECT id FROM roles WHERE role_name = ?), username = ?, password = ?, email = ?, name = ?, birth = ?, gender = ?,status =?, updated_at = CURRENT_TIMESTAMP WHERE id = ?;",
            [
                user.role_name,
                user.username,
                user.password,
                user.email,
                user.name,
                user.birth,
                user.gender,
                user.status,
                id
            ]
        );
        return result;
    };
}