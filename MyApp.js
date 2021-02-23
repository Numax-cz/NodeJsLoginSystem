const bcrypt = require('bcrypt');
const connection = require('./DatabaseConnection');
require('dotenv').config();

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
    const min = process.env.MIN_USERNAME_LENGTH; //Zde se nastavuje min. délka jména
    const max = process.env.MAX_USERNAME_LENGTH; //Zde se nastavuje max. délka jména
    if(UserName.length >= min){ //Kontrola zda není heslo kratší jak min
        if(UserName.length < max){ //Kontrola zda není heslo delší než max 
            if(/^[a-zA-Z\-]+$/.test(UserName) == true){ //Kontrola zda jméno neobsahuje nepovolené znaky
                return [{error: false, zprava: ""}]
            }else{ //Když jméno obsahuje nepovolené znaky
                return [{error: true, zprava: "*Nepovolené znaky"}]
            }
        }else{ //Když uživatelské jméno je dlouhé 
            return [{error: true, zprava: "Jméno je dlouhé"}]
        }
    }else{ //Když je uživatelské jméno krátké než min
        return [{error: true, zprava: "*Alespoň 3 zanky"}]
    }
}

module.exports.PasswordChecker = (Password) => {
    const min = process.env.MIN_PASSWORD_LENGTH; //Zde se nastavuje min. délka hesla
    const max = process.env.MAX_PASSWORD_LENGTH; //Zde se nastavuje max. délka hesla
    if(/[0-9A-Za-z-@#$%]/.test(Password) == true){ //Když heslo obsahuje nepovolené znaky
        if(Password.length <= min){ //Když je heslo krátké
            return {error: true, zprava: "*Heslo je krátké"}
        }
        else if(Password.length > max){ //Když je heslo dlouhé
            return {error: true, zprava: "*Heslo je dlouhé"}
        }else{
            return {error: false, zprava: ""}
        }
    }else{
        return {error: true, zprava: "*Tyto znaky nejsou povoleny"}
    }

}
module.exports.PasswordAuth = (Password, PasswordCheck) => { //Kontroluje zda jsou oba vstupy stejné
    if(Password === PasswordCheck && Password.length > 0){
        return {error: false, zprava: ""}
    }else{
        return {error: true, zprava: "*Hesla se neshodují"}
    }
}