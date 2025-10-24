import sequelize from '../../config/database.js';
import User from '../../models/User.js';

(async ()=>{
  try{
    await sequelize.authenticate();
    const users = await User.findAll();
    console.log('Users in DB:', users.map(u=>({id:u.id,username:u.username,email:u.email,acesso:u.acesso}))); 
    process.exit(0);
  }catch(err){
    console.error('erro listUsers',err);
    process.exit(1);
  }
})();