import connection from "../db/connectionMySql.js";

class UserDAO {
    create(user) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO user (email, password,  username, native_language, id_person) VALUES (?, ?, ?, ?, ?);";
            connection.query(sql, [user.email, user.password1, user.username, user.nativeLanguage, user.id_person], (error, result) => {
                if (error)
                    return reject("Erro Inserindo os dados do User no banco.\nErro:" + error);
                return resolve(result.affectedRows);
            });
        });
    }

    update(user) {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE user SET password=?, username=?, native_language=? WHERE email=?;";
            connection.query(sql, [user.password1, user.username, user.nativeLanguage, user.email], (error, result) => {
                if (error)
                    return reject("Erro Actualizando os dados do User no banco.\nErro:" + error);
                return resolve(result.affectedRows);
            });
        });
    }

    delete(id) {
        return new Promise((resolve, reject)=>{
            const sql = "DELETE FROM user WHERE id=?;";
            connection.query(sql, [id], (error, result) => {
                if (error)
                    return reject("Erro Deletando os dados do User no banco.\nErro:" + error);
                return resolve(result.affectedRows);
            });    
        });
    }
    
    findCompletedById(id) {
        return new Promise((resolve, reject)=>{
            const sql = "SELECT * FROM user INNER JOIN person WHERE user.id_person=person.id and user.id=?;";
            connection.query(sql, [id], (error, result) => {
                if (error) return reject("Erro Selecionando o User pelo ID.\n"+error);
                return resolve(result[0]); 
            });
        });
    }
    findById(id) {
        return new Promise((resolve, reject)=>{
            const sql = "SELECT * FROM user WHERE id=?;";
            connection.query(sql, [id], (error, result) => {
                if (error) return reject("Erro Selecionando o User pelo ID.\n"+error);
                return resolve(result[0]); 
            });
        });
    }

    findAll() {
        return new Promise((resolve, reject)=>{
            const sql = "SELECT * FROM user;";
            connection.query(sql, [], (error, result)=>{
                if(error) return reject("Erro Listando Todos os Users.\n"+error);
                return resolve(result);
            })
        });
    }

    isUser(user){
        return new Promise((resolve, reject)=>{
            const sql = "SELECT * from user WHERE email=? and password=?";
            connection.query(sql, [user.email, user.password], (error, result)=>{
                if(error) return reject("Erro Procurando o User no Banco."+error);
                return resolve(result);
            });
        })
    }
}

export default new UserDAO;