const promisePool = require("../config/db");

const generateUniqueCode = {
    User: async () => {
        try {
            let isUnique = false
            let user_code = ''
            while (!isUnique) {
                const number = Math.floor(Math.random() * 1000000) + 1; // Tạo một số ngẫu nhiên từ 1 đến 1000000
                const numberString = number.toString().padStart(6, '0');
                user_code = `TK${numberString}`;
                // Kiểm tra trong database xem user_code này đã tồn tại chưa
                const [rows] = await promisePool.query("SELECT * FROM users WHERE user_code = ?;", [user_code]);
                if (rows.length === 0) {
                    isUnique = true;
                }
            }
            return user_code
        } catch (error) {
            console.error("Error generating unique code:", error);
            throw error;
        }
    }


};

module.exports = generateUniqueCode