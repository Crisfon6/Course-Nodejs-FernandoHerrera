const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLECLIENTID);

const googleVerify = async(idToken) => {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLECLIENTID
    });
    const {
        name,
        picture: img,
        email,
    } = ticket.getPayload();
    return { name, img, email };
}

module.exports = {
    googleVerify
}