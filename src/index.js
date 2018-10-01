const {db_read, db_write} = require('../models');
debugger
async function test(){
  debugger
  const resp1 = await db_write.User.create({name: 'kuldeep'});
  const resp = await db_write.User.all();
  
console.log(resp)

}
test();