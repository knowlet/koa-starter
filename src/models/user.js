const crypto = require('crypto')
const { DEFAULT_PASS } = require('../../config')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user: { type: DataTypes.STRING, unique: true },
    pass: DataTypes.STRING(64),
    name: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {})
  User.associate = function (models) {
    // associations can be defined here
  }
  User.sync().then(() => {
    // Table created
    return User.findOrCreate({ where: { user: 'admin' },
      defaults: {
        user: 'admin',
        pass: crypto.createHash('sha256').update(DEFAULT_PASS, 'utf8').digest('hex'),
        name: 'John',
        isAdmin: true
      }
    })
  })
  return User
}
