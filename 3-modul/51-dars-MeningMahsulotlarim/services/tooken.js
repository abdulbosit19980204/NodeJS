import jwt from 'jsonwebtoken'


const generateJWTToken = userID => {
    const accessToken = jwt.sign({ userID }, process.env.JWT_SECRET, { expiresIn: '30d' })

    return accessToken
}

export { generateJWTToken }