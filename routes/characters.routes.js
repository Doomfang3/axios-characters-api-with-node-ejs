const router = require("express").Router();
const ApiService = require("../services/api.service");

const apiService = new ApiService();

//render form of create-one-character
router.get("/characters/create", (req, res) => {
	res.render("characters/create-character");
});

//create one character
router.post("/characters/create", async (req, res) => {
	try {
		const newCharacterInfo = {
			...req.body,
			debt: req.body.debt ? "true" : "false",
		};
		const newCharacter = await apiService.createCharacter(newCharacterInfo);
		res.redirect(`/characters/${newCharacter.data.id}`);
	} catch (error) {
		console.log("Error when creating one character through API - ", error);
	}
});

//get all characters
router.get("/characters", async (req, res, next) => {
	try {
		const { data: characters } = await apiService.getAllCharacters();
		res.render("characters/list-characters", { characters });
	} catch (error) {
		console.log("Error when getting all characters info from API - ", error);
	}
});

//get one character
router.get("/characters/:id", async (req, res, next) => {
	try {
		const { data: character } = await apiService.getOneCharacter(req.params.id);
		console.log("One char", character);
		res.render("characters/details-character", { character });
	} catch (error) {
		console.log("Error when getting one characters info from API - ", error);
	}
});

//render form of edit-one-character
router.get("/characters/edit/:id", async (req, res, next) => {
	try {
		const { data: character } = await apiService.getOneCharacter(req.params.id);
		console.log("edit char", character);
		res.render("characters/edit-character", { character });
	} catch (error) {
		console.log(
			"Error when getting one characters info from API and rendering it to form - ",
			error
		);
	}
});

//edit one character
router.post("/characters/edit/:id", async (req, res, next) => {
	try {
		console.log("body info", req.body);
		const newCharacterInfo = {
			...req.body,
			debt: req.body.debt ? "true" : "false",
		};
		console.log("infor to api", newCharacterInfo);
		await apiService.editCharacter(req.params.id, newCharacterInfo);
		res.redirect(`/characters/${req.params.id}`);
	} catch (error) {
		console.log("Error when editing one characters through API - ", error);
	}
});

//delete a character
router.get("/characters/delete/:id", async (req, res, next) => {
	try {
		await apiService.deleteCharacter(req.params.id);
		res.redirect("/characters");
	} catch (error) {
		console.log(
			"Error when deleting one characters info through API - ",
			error
		);
	}
});

module.exports = router;

// https://ih-crud-api.herokuapp.com/characters
