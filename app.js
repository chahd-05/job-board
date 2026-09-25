const express = require("express");

const app = express();

const port = 3000;


app.set("view engine", "ejs");


app.use(express.urlencoded({ extended: true }));


const offresRoutes = require("./routes/offres");

app.use("/offres", offresRoutes);


app.get("/", (req, res) => {
    res.send("Bienvenue sur Job Board !");
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});