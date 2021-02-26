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
    const Name = req.body.FormInputName;
    const Description = req.body.FormInpuDescription;
    connection.query(`UPDATE blog SET name='${Name}', description='${Description}' WHERE nameother='${req.params.nazevclanku}'`, function(err, DataBaseData, fl){
        res.redirect('/');
    });
});


module.exports = router;