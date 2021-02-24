const express = require('express');
const app = express();
const http = require('http').createServer(app);
const BlogRouter = require('./routes/RouteApp');
const connection = require('./DatabaseConnection');
const cookiesession  = require('cookie-session');
const datum = require('dataformat');
const MyApp = require('./MyApp');

connection.connect(function(e) {
    if (e) throw e;
    console.log('Napojení na DB bylo ez');
})


app.use(express.urlencoded({ extended: false }));




app.use(cookiesession({
    name: 'session',
    keys: ['JsiL', 'JsiW'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hodin
}))



//--------------GET--------------//
app.get('/', function(req, res){
    if(req.session.username){
        res.redirect('u/blog')
    }else{
        connection.query("SELECT * FROM blog ORDER BY id DESC", function(err, DataBaseData, fl){ //Výběr dat z DB
    
            res.render('index', {BlogPanel: DataBaseData});
        });
    }

});

app.get('/login', function(req, res){
    if(req.session.username){
        res.redirect('u/panel');
    }else{
        res.render('login');
    }
});

app.get('/register', function(req, res){
    if(req.session.username){
        res.redirect('u/panel');
    }else{
        res.render('register');
    }
});


app.get('/logout', function(req, res){
    req.session = null; //Destroy session
    res.redirect('/'); 
})
//--------------GET--------------//


app.post('/userpost', function(req, res){ //Kontrola zda není jméno duplikované
    const UserName = req.body.FormUserNameRegister; //input jméno
    const UserPass = req.body.FormPasswordRegister; //input heslo
    const UserPasschk = req.body.FormPasswordChecker; // input heslo znovu
    connection.query(`SELECT * FROM login WHERE username='${UserName}'`, function(err, DataBaseData, fl){
        const ArrayUserName = MyApp.NameChecker(UserName); //Kontroluje jméno 
        const ArrayUserPass = MyApp.PasswordChecker(UserPass); //Kontroluje heslo
        const ArrayUserPassChk = MyApp.PasswordAuth(UserPass, UserPasschk); //Kontroluje zda jsou oba inputy stejné
        if(!DataBaseData.length){ //Když jméno neexistuje
            ArrayUserName.push(ArrayUserPass);
            ArrayUserName.push(ArrayUserPassChk);
            res.json(ArrayUserName);
        }else{ //Když jméno existuje
            const ArrayUserName = [{error: true, zprava: "*Uživatel existuje", existuje: true}];
            ArrayUserName.push(ArrayUserPass);
            ArrayUserName.push(ArrayUserPassChk);
            res.json(ArrayUserName);
        }
    });
});
app.post('/registerpost', async function(req, res){ //Zapsání jména a hesla
    const UserName = req.body.FormUserNameRegister; //input jméno
    const UserPass = req.body.FormPasswordRegister; //input heslo
    const UserPasschk = req.body.FormPasswordChecker //input heslo znovu
    const pscchk = MyApp.PasswordChecker(UserPass); //Kontroluje zda je heslo v dobrém tvaru
    const userchecker = MyApp.NameChecker(UserName); //Kontroluje zda je jméno v dobrém tvaru
    const pscchk2 = MyApp.PasswordAuth(UserPass, UserPasschk); //Kontroluje zda jsou vstupy stejné 

    if(pscchk.error == false && userchecker[0].error == false && pscchk2.error == false){ //Když heslo a jméno jsou v dobrém tvaru
        connection.query(`SELECT * FROM login WHERE username='${UserName}'`, async function(err, DataBaseData, fl){ //Kontrola zda uživatelské jméno neexistuje
            if(!DataBaseData.length){ // Uživatel neexistuje
                const UserPassHash = await MyApp.HashPassword(UserPass); //Vrátí zašifrované heslo
                MyApp.DatabaseUserNamePasswordHash(UserName, UserPassHash); //Jebne do db data
                req.session.username = UserName; //Vytvoří session
                res.redirect('u/panel');
            }else{ // Uživatel existuje
                res.redirect('/register');
            }
        });
    }else{
        res.redirect('/register');
    }




});
app.post('/loginpost', async function(req, res){
    const UserName = req.body.FormUserNameLogin; //input jméno (login)
    const UserPass = req.body.FormPasswordLogin; //input heslo (login)
    connection.query(`SELECT * FROM login WHERE username='${UserName}'`, async function(err, DataBaseData, fl){
        if(DataBaseData.length){ //Kontrola zda je k čemu se přihlásit
            const DatabaseUserpassword = DataBaseData[0].password;
            if(await MyApp.CheckPassword(UserPass, DatabaseUserpassword) == true){
                req.session.username = UserName; //Session username
                res.redirect('u/panel');
            }else{ //Když je zadané heslo na číču
                res.redirect('/login');
            }   
        }else{ // kdžy není se k čemu přihlásit
            res.redirect('/login');
        }

    });
});
app.post('/changeusername', function(req, res){
    const UserNameChange = req.body.UserNameChange; //input jména (Změna jména)
    const UserNameStay = req.session.username; //Session username
    connection.query(`SELECT * FROM login WHERE username='${UserNameChange}'`, function(err, DataBaseData, fl){
        if(!DataBaseData.length){ //Kontrola zda uživatelské jméno neexistuje
            connection.query(`UPDATE login SET username='${UserNameChange}' WHERE username='${UserNameStay}'`, function(err, DataBaseData, fl){
                req.session.username = UserNameChange;
                res.redirect('u/nastaveni')
            });
        }else{
            res.redirect('u/error/usernamechange')
        }
    });
});




app.post('/post', function(req, res){ //Postování blogu
    if(req.session.username){
        const BlogName = req.body.FormInputName;
        const BlogUserName = req.session.username;  
        const BlogDate = datum( new Date(), "yyyy-mm-dd");
        const BlogDescription = req.body.FormInpuDescription;
        connection.query(`SELECT * FROM blog WHERE name='${BlogName}'`, async function(err, DataBaseData, fl){
            const BlogId = BlogName + - +(DataBaseData.length + 1);
            connection.query(`INSERT INTO blog (name, username, date, description, nameother) VALUES ('${BlogName}', '${BlogUserName}', '${BlogDate}', '${BlogDescription}', '${BlogId}')`)
            res.redirect('/');
        });
    }else{
        res.redirect('/login');
    }
});



//Router setup
app.set('view engine', 'ejs');

app.use('/blog', BlogRouter);
app.use('/u', BlogRouter);
app.use('/u/error', BlogRouter);
app.use('/u/blog', BlogRouter);
app.use(express.static(__dirname + '/public')); //CSS



http.listen(8080, () => { console.log('more low app jede xd'); });



