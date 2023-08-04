import mysql2 from 'mysql2'

const connecticon = mysql2.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'erivelto',
    password: 'otlevire',
    database: 'db_banco'
});  

connecticon.connect((error)=>{
    if(error)
        console.log(error);
    else
        console.log('Connected to db!');
});

export default connecticon;