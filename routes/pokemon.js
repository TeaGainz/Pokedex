import express from "express";
import axios from "axios";
import env from "dotenv";

env.config();

const router = express.Router();
const API_BASE_URL = process.env.API_BASE_URL
const API_POKEMON_URL = process.env.API_POKEMON_URL;

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon?limit=1302`);
    res.render("pages/home", { pokemonList: response.data.results });
  } catch (error) {
    res.status(500).send("Error fetching Pokémon data");
  }
});

router.get("/pokemon/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${API_POKEMON_URL}${id}`);
    res.render("pages/details", { pokemon: response.data });
  } catch (error) {
    res.status(500).send("Pokémon not found");
  }
});

router.get("/search", async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) return res.redirect("/");

    const response = await axios.get(`${API_POKEMON_URL}${name}`);
    res.render("pages/details", { pokemon: response.data });
  } catch (error) {
    res.status(404).send("Pokémon not found");
  }
});



export default router;