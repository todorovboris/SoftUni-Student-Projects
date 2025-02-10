import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    const payload = { _id: user._id, email: user.email };
    const secretKey = 'thisIsMySoftUniSecretKey';
    const token = jwt.sign(payload, secretKey, { expiresIn: '2h' });

    return token;
};
