# NapicuBlog
## Použité balíčky 
* bcrypt@5.0.0
* body-parser@1.19.0
* cookie-session@1.4.0
* dataformat@1.0.0
* dotenv@8.2.0
* ejs@3.1.6
* express@4.17.1
* http@0.0.1-security
* mysql@2.18.1
* nodemon@2.0.7
# Nastavení .env 
```
DB_HOST=localhost
DB_USER= UŽIVATEL
DB_DB= DB
DB_PASS= VAŠE HESLO
MIN_USERNAME_LENGTH=3
MAX_USERNAME_LENGTH=25
MIN_PASSWORD_LENGTH=6
MAX_PASSWORD_LENGTH=100
```
## Jak nastavit blog?
* Exportujte tabulky do phpmyadmin které naleznete ve složce `SETUP`
* Jestli se vám nepodaří exportovat sql do phpmyadmin můžete použít přímo sql příkaz:

```sql
CREATE TABLE `test`.`blog` ( `id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(100) CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL , `username` VARCHAR(100) CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL , `description` TEXT CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL , `nameother` VARCHAR(100) CHARACTER SET utf8 COLLATE utf8_czech_ci 
```

```sql
CREATE TABLE `test`.`login` ( `id` INT NULL , `username` VARCHAR(100) CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL , `password` VARCHAR(500) NOT NULL ) ENGINE = InnoDB;
NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
```


* V adresáři zadejte příkaz: 
    ```
    npm i
    ```
* Vytvořte .env a zadejte do ní údaje od databáze
* Jak nainstalujete balíčky můžete spustit aplikaci příkazem:
    ``` 
    npm run start
    ```
* Jestli tabulku exportujete můžete se rouvnou přihlásit username: `Admin` password: `Admin123`

