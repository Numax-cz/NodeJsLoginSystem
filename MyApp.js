const bcrypt = require('bcrypt');
const connection = require('./DatabaseConnection');


module.exports.HashPassword = async(Password) => { //Zašifruje heslo
    const salt = 10;
    return await bcrypt.hash(Password, salt);
}
module.exports.CheckPassword = async (Password, Hash) => { //Kontroluje zda zadané heslo je správné
    return await bcrypt.compare(Password, Hash); //Vrátí true nebo false
}
module.exports.DatabaseUserNamePasswordHash = (user, pass) => { //Zapíše do db jméno a heslo
    connection.query(`INSERT INTO login (username, password) VALUES ('${user}', '${pass}')`)
}

module.exports.NameChecker = (UserName) => { //Kontroluje zda je uživatelské jméno napsáno v dobrém tvaru
    const min = 3;
    const max = 10;
    if(UserName.length >= min){ //Kontrola zda není heslo kratší jak min
        if(UserName.length < max){ //Kontrola zda není heslo delší než max 
            if(/^[a-zA-Z\-]+$/.test(UserName) == true){ //Kontrola zda jméno neobsahuje nepovolené znaky
                return {error: false, zprava: "*GOOD"}
            }else{ //Když jméno obsahuje nepovolené znaky
                return {error: true, zprava: "*Nepovolené znaky"}
            }
        }else{ //Když uživatelské jméno je dlouhé 
            return {error: true, zprava: "Uživatelské jméno je dlouhé"}
        }
    }else{ //Když je uživatelské jméno krátké než min
        return {error: true, zprava: "*Alespoň 3 zanky"}
    }
}

