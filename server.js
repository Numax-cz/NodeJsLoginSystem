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
    connection.query("SELECT * FROM blog ORDER BY id DESC", function(err, DataBaseData, fl){ //Výběr dat z DB
        DataBaseData.sort(function (a,b){ return b.id - a.id });
        res.render('index', {BlogPanel: DataBaseData});
    });
});

app.get('/login', function(req, res){
    if(req.session.username){
        res.redirect('/panel');
    }else{
        res.render('login');
    }
});

app.get('/register', function(req, res){
    if(req.session.username){
        res.redirect('/panel');
    }else{
        res.render('register');
    }
});

app.get('/panel', function(req, res){
    if(req.session.username){
        res.render('panel', {username: req.session.username});
    }else{
        res.redirect('/login');
    }
});
app.get('/logout', function(req, res){
    req.session = null; //Destroy session
    res.redirect('/'); 
})
//--------------GET--------------//


app.post('/userpost', function(req, res){ //Kontrola zda není jméno duplikované
    const UserName = req.body.FormUserNameRegister; //input jméno
    connection.query(`SELECT * FROM login WHERE username='${UserName}'`, function(err, DataBaseData, fl){
        if(!DataBaseData.length){ //Když jméno neexistuje
            res.json(MyApp.NameChecker(UserName));
        }else{ //Když jméno existuje
            res.json({error: true, zprava: "*Uživatel existuje", existuje: true});
        }
    });
});
app.post('/registerpost', async function(req, res){ //Zapsání jména a hesla
    const UserName = req.body.FormUserNameRegister; //input jméno
    const UserPass = req.body.FormPasswordRegister; //input heslo
    const UserPasschk = req.body.FormPasswordChecker //input heslo znovu
    if(UserPass === UserPasschk){
        connection.query(`SELECT * FROM login WHERE username='${UserName}'`, async function(err, DataBaseData, fl){

            if(!DataBaseData.length){ // Uživatel neexistuje
                const userchecker = MyApp.NameChecker(UserName);
                if(userchecker.error == false){ //Kontrola zda je jméno v dobrém tvaru
                    const UserPassHash = await MyApp.HashPassword(UserPass); //Vrátí zašifrované heslo
                    MyApp.DatabaseUserNamePasswordHash(UserName, UserPassHash); //Jebne do db data
                    req.session.username = UserName; //Vytvoří session
                    res.redirect('/panel');
                }else{ //Když jméno je ve špatném tvaru
                    res.redirect('/register');
                }
    
            }else{ // Uživatel existuje
                res.redirect('/register');
            }
        });
    }else{ //Když je uživatel L a napíše špatné heslo 
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



                res.redirect('/panel');
            }else{
                console.log('Zadané heslo není good');
            }
        }else{ // kdžy není se k čemu přihlásit
            console.log('ERR');
        }

    })
});




app.post('/post', function(req, res){ //Zapsání dat do DB
    const BlogName = req.body.FormInputName;
    const BlogUserName = 'Numax';
    const BlogDate = datum( new Date(), "yyyy-mm-dd");
    const BlogDescription = req.body.FormInpuDescription;
    connection.query(`INSERT INTO blog (name, username, date, description) VALUES ('${BlogName}', '${BlogUserName}', '${BlogDate}', '${BlogDescription}')`)
    res.redirect('/');
});




app.set('view engine', 'ejs');

app.use('/blog', BlogRouter);
app.use(express.static(__dirname + '/public')); //CSS



http.listen(8080, () => { console.log('more low app jede xd'); })



