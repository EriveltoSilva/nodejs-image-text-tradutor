import connection from "../db/connectionMySql.js";

class TranslationDAO {
    create(translation) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO translation (source_text, final_text,  source_language, final_language, id_user) VALUES (?, ?, ?, ?, ?);";
            connection.query(sql, [translation.sourceText, translation.finalText, translation.sourceLanguage, translation.finalLanguage, translation.idUser], (error, result) => {
                if (error)
                    return reject("Erro Inserindo os dados da Tradução no banco.\n" + error);
                return resolve(result.affectedRows);
            });
        });
    }

    update(translation) {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE translation SET source_text=?, final_text=?, source_language=? , final_language=? WHERE id_user=?;";
            connection.query(sql, [translation.sourceText, translation.finalText, translation.sourceLanguage, translation.finalLanguage, translation.idUser], (error, result) => {
                if (error)
                    return reject("Erro Actualizando os dados da Translation no banco.\n" + error);
                return resolve(result.affectedRows);
            });
        });
    }

    delete(id) {
        return new Promise((resolve, reject)=>{
            const sql = "DELETE FROM translation WHERE id=?;";
            connection.query(sql, [id], (error, result) => {
                if (error)
                    return reject("Erro Deletando os dados da Translation no banco.\n" + error);
                return resolve(result.affectedRows);
            });    
        });
    }

    findById(id) {
        return new Promise((resolve, reject)=>{
            const sql = "SELECT * FROM translation WHERE id=?;";
            connection.query(sql, [id], (error, result) => {
                if (error) return reject("Erro Selecionando a Translation pelo ID.\n"+error);
                return resolve(result[0]); 
            });
        });
    }

    findAll() {
        return new Promise((resolve, reject)=>{
            const sql = "SELECT * FROM translation;";
            connection.query(sql, [], (error, result)=>{
                if(error) return reject("Erro Listando Todos as Translations.\n"+error);
                return resolve(result);
            })
        });
    }

    
}

export default new TranslationDAO;