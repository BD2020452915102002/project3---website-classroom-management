const mergeFields = async (reqBody, oldData) => {
    const newData = oldData;
    if (typeof reqBody === 'object' && reqBody !== null) {
        for (const key in reqBody) {
            // Nếu trường trong req.body không rỗng, lưu vào biến mới
            if (reqBody[key] !== '') {
                newData[key] = reqBody[key];
            }
        }
    } else {
        console.log('Err')
    }

    return newData;
}

module.exports = {mergeFields}