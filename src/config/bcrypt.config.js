const bcrypt = require('bcryptjs');

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

async function verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

module.exports = { hashPassword, verifyPassword };
