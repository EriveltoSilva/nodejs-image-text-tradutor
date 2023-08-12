import connection from "../db/connectionMySql.js";

class PersonDAO {
    create(user) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO person (first_name, last_name, bi,birthday, gender, marital_status, nationality,address) VALUES (?,?, ?, ?, ?, ?, ?, ?);";
            connection.query(sql, [user.firstName, user.lastName, user.bi,user.birthday, user.gender, user.maritalStatus, user.nationality, user.address], (error, result) => {
                if (error) 
                    return reject("Aconteceu um erro inserindo os dados da Pessoa no banco.\nErro:" + error);
                else if(result.affectedRows>0)
                    return resolve(result.affectedRows);
            });
        });
    }

    update(user) {
        return new Promise((resolve, reject)=>{
            const sql ="UPDATE person set first_name=?, last_name=?,  gender=?, marital_status=?, address=? WHERE bi=?";
            connection.query(sql, [user.firstName, user.lastName, user.gender, user.maritalStatus, user.address, user.bi], (error, result) => {
                if (error) 
                    return reject("Erro Actualizando os dados da Pessoa no banco.\n" + error);
                else if(result.affectedRows>0)
                    return resolve(result.affectedRows);
            });
        });
    }

    delete(id) {
        return new Promise((resolve, reject)=>{
            const sql ="DELETE FROM person WHERE id=?;";
            connection.query(sql, [id], (error, result)=>{
                if(error) return reject("Erro Delectando Pessoa pelo Id.\n"+error);
                return resolve(result.affectedRows);
            });
        });
    }

    findId(user)
    {
        return new Promise((resolve, reject)=>{
            const sql = "SELECT id from person where bi=?;";
            connection.query(sql, [user.bi], (error, result)=>{
                if(error) 
                    return reject("Aconteceu um erro selecionando a Pessoa pelo Id.\nErro:"+error);
                return resolve(result[0].id);
            });
        });
    }

    findById(id) {
        return new Promise((resolve, reject)=>{
            const sql = "SELECT * from person where id=?;";
            connection.query(sql, [id], (error, result)=>{
                if(error) 
                    return reject("Erro Selecionando a Pessoa pelo Id.\n"+error);
                return resolve(result[0]);
            });
        });
    }

    findAll() {
        return new Promise((resolve, reject)=>{
            const sql = "SELECT * FROM person;";
            connection.query(sql,[], (error, result)=>{
                if(error) return reject("Erro Listando todas as Pessoas.\n"+error);
                return resolve(result);
            });
        });
    }
}

export default new PersonDAO;