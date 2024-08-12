const {
    findUserByEmail,
    registration,
    login,
} = require('./../service/auth.service');

const signUp = async (req, res) => {
    const { firstname, lastname, gender, hobbies, mobile, email, password } =
        req.body;
    try {
        const userDetails = await findUserByEmail(email);
        if (userDetails) {
            return res.status(400).json({ message: 'User already exists.' });
        }
        await registration(
            firstname,
            lastname,
            gender,
            hobbies,
            mobile,
            email,
            password
        );
        return res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating user.',
            error: error.message,
        });
    }
};

const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await login(email, password);
        return res.status(200).json({
            message: 'User login succesfully!!!',
            jwtToken: token,
        });
    } catch (error) {
        if (error.message === 'User credentials are wrong.') {
            return res.status(400).json({ error: error.message });
        } else if (error.message === 'Invalid password') {
            return res.status(401).json({ error: error.message });
        } else {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = { signUp, signIn };
