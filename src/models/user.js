const bcrypt = require('bcrypt')
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
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(DEFAULT_PASS, salt);
    return User.findOrCreate({ where: { user: 'admin' },
      defaults: {
        user: 'admin',
        pass: hash,
        name: 'John',
        isAdmin: true
      }
    })
  })
  return User
}
