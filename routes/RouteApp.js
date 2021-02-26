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
router.get('/blog', (req, res) => {
    if(req.session.username){
        connection.query("SELECT * FROM blog ORDER BY id DESC", function(err, DataBaseData, fl){ //Výběr dat z DB
            res.render('u/blog', {BlogPanel: DataBaseData, Name: req.session.username });
        });
    }else{
        res.redirect('/login');
    }
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

module.exports = router;