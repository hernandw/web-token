const express = require("express");

const router = express.Router();

const { getEvent, getUser } = require("../consultas/consultas");

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/users", async (req, res) => {
    try {
        const consulta = await getUser();
        res.json(consulta);
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
});
  
router.get('/token', async (req, res) => {
    
    const token = null
    res.json({
        token
    })
})

router.get('/public', async (req, res) => {
    res.send('Soy un sitio Publico')
})

router.get('/private', async (req, res) => {
    res.send('Soy un sitio Privado')
})


module.exports = router;
