const express = require("express");
const path = require("path");

const app = express();

const port = 3000;


app.set("view engine", "ejs");


app.use(express.urlencoded({ extended: true }));
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/js", express.static(path.join(__dirname, "js")));


const offresRoutes = require("./routes/offres");
const adminRoutes = require("./routes/admin");


app.use("/offres", offresRoutes);
app.use("/admin", adminRoutes);


app.get("/", (req, res) => {
    res.send("Bienvenue sur Job Board !");
});


app.use((req, res) => {
    res.status(404).send("Page introuvable");
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});