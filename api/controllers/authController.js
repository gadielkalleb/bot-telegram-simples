const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const path = require('path')

const User = require(path.resolve('./api/models/user'))
const authConfig = process.env.JWT_SECRET || require(path.resolve('./config/auth.json'))
const mailer = require(path.resolve('./modules/mailer'))

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  })
}

exports.register = async (req, res) => {
  const { email } = req.body
  try {
    if (await User.findOne({ email })) return res.status(400).send({ error: 'User already exists' })
    const user = await User.create(req.body)
    user.password = undefined
    return res.send({
      user,
      token: generateToken({ id: user.id }),
    })
  } catch (err) {
    return res.status(400).send({
      error: 'registration failed',
    })
  }
}

exports.authenticate = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }).select('+password')

  if (!user) res.status(400).send({ error: 'User not found!' })

  if (!await bcrypt.compare(password, user.password)) {
    return res.status(400).send({ error: 'invalid password' })
  }
  user.password = undefined
  res.status(200).send({
    user,
    token: generateToken({ id: user.id }),
  })
}

exports.forgot_password = async (req, res) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).send({ erro: 'User not found' })
    }
    const token = crypto.randomBytes(20).toString('hex')
    const now = new Date()
    now.setHours(now.getHours() + 1)
    await User.findByIdAndUpdate(user.id, {
      $set: {
        passwordResetToken: token,
        passwordResetExpires: now,
      },
    })
    mailer.sendMail({
      to: email,
      from: 'gadiel_kalleb@hotmail.com',
      template: 'auth/forgot_password',
      context: { token },
    }, (err) => {
      if (err) return res.status(400).send({ error: 'cannot send forgot password email' })
      return res.send()
    })
    // fim ==
  } catch (err) {
    res.status(400).send({ error: 'erro on forgot password, try again' })
  }
}
