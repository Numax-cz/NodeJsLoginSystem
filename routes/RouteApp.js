const express = require('express');
const router = express.Router();
const connection = require('../DatabaseConnection');





router.get('/panel', (req, res) => { //User Panel
    if(req.session.username){
        res.render('u/panel', {username: req.session.username});
    }else{
        res.redirect('/login');
    }
})

router.get('/new', (req, res) => {
    res.render('blog/new');
});
router.get('/usernamechange', (req, res) => {
    res.render('u/error/usernamechange');
});


router.get('/nastaveni', (req, res) => { //User panel nastavení
    if(req.session.username){
        res.render('u/nastaveni', {username: req.session.username, error: [], success: []});
    }else{
        res.redirect('/login');
    }
});
router.get('/userblog', (req, res) => {
    if(req.session.username){
        connection.query(`SELECT * FROM blog WHERE username='${req.session.username}'`, function(err, DataBaseData, fl){
            res.render('u/userblog', {username: req.session.username, BlogPanel: DataBaseData});
        }); 
    }else{
        res.redirect('/login');
    }
});
router.get('/view/:nazevclanku', (req, res) => { //Prohlížení 1 vybráného článku
    const nazevclanku = req.params.nazevclanku;
    if(nazevclanku){
        connection.query(`SELECT * FROM blog WHERE nameother='${nazevclanku}'`, async function(err, DataBaseData, fl){
            res.render('blog/view', {BlogPanel: DataBaseData});
        });  
    }else{ //Pokuď není nastaven parametr článku clanek= id clanku
        res.redirect('/');
    }
});
router.get('/edit/:nazevclanku', (req, res) => {
    const nazevclanku = req.params.nazevclanku;
    if(nazevclanku){ //kontrola zda byl zadán params
        connection.query(`SELECT * FROM blog WHERE nameother='${nazevclanku}'`, async function(err, DataBaseData, fl){
            if(req.session.username === DataBaseData[0].username){ //Kontorla zda uživatel má oprávnění 
                res.render('blog/edit', {data: DataBaseData});
            }else{ //Když uživatel nemá oprávnění
                res.redirect('/')
            }
            
        });  
    }else{ //Pokuď není nastaven parametr článku clanek= id clanku
        res.redirect('/');
    }
});
router.post('/edit/:nazevclanku', (req, res) => {
    // NĚKDY DODĚLAT IGNORACU ATD... SI VZPOMENU 100%
    const Name = req.body.FormInputName;
    const Description = req.body.FormInpuDescription;
    //Kontrola zda user změnil udaje
    connection.query(`SELECT * FROM blog WHERE name='${Name}' AND nameother= '${req.params.nazevclanku}'`, function(err, DataBaseData, fl){
        connection.query(`SELECT * FROM blog WHERE name='${Name}'`, async function(err, DataBaseData2, fl){
            if(DataBaseData.length){ //Když existuje jméno 
                var BlogId = req.params.nazevclanku;
            }else{ //Když neexistuje 
                var BlogId = Name + - +(DataBaseData2.length + 1);
            }
            connection.query(`UPDATE blog SET name='${Name}', description='${Description}', nameother='${BlogId}' WHERE nameother='${req.params.nazevclanku}'`, function(err, DataBaseData, fl){
                res.redirect('/');
            });

        });
    });
});

router.get('/delete/:nazevclanku', (req, res) => { //Smazat blog         
    connection.query(`DELETE FROM blog where nameother='${req.params.nazevclanku}'`, function(err, DataBaseData, fl){
        res.redirect(req.headers.referer); //Vrátí na predchozhí pozicu
    });
});

module.exports = router; 