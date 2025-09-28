const User = sequelize.define('User', {
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  is_master: DataTypes.BOOLEAN
}, {
  tableName: 'users',
  schema: 'public',
  timestamps: false
});
