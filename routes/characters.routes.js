const router = require("express").Router();
const axios = require("axios");

/* GET home page */
router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
    .then((responseFromAPI) => {
        // console.log(responseFromAPI)
        res.render("characters/list-characters", { characters: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

// GET new characters
router.get("/characters/create", (req, res) => {
        res.render("characters/create-character");
});

//POST new characters
router.post("/characters/create", (req, res, next) => {

    if (req.body.debt === "on") {
        req.body.debt = true
    } else {
        req.body.debt = false
    }

    axios.post("https://ih-crud-api.herokuapp.com/characters", req.body) // req.body for displaying the content 
    .then ((responseFromAPI) => {
        // console.log(responseFromAPI)
        res.redirect("/characters");
    })
    .catch(err => console.error(err))
    console.log(req.body)
});


router.get("/characters/:id", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI => {
        // console.log("details: ", responseFromAPI.data)
        res.render("characters/details-character", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});


module.exports = router;


// https://ih-crud-api.herokuapp.com/characters