require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const mysql = require("mysql2/promise");

async function reset() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        multipleStatements: true
    });

    try {
        await connection.query("SET FOREIGN_KEY_CHECKS = 0");
        await connection.query("DROP TABLE IF EXISTS offre_technologie");
        await connection.query("DROP TABLE IF EXISTS offre");
        await connection.query("DROP TABLE IF EXISTS technologie");
        await connection.query("DROP TABLE IF EXISTS entreprise");
        await connection.query("SET FOREIGN_KEY_CHECKS = 1");

        const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");
        await connection.query(schema);
    } finally {
        await connection.end();
    }

    const seed = spawnSync(process.execPath, [path.join(__dirname, "seed.js")], {
        stdio: "inherit"
    });

    if (seed.error) {
        throw seed.error;
    }

    if (seed.status !== 0) {
        process.exitCode = seed.status || 1;
    }
}

reset().catch((error) => {
    console.error("Erreur lors de la réinitialisation :", error.message);
    process.exitCode = 1;
});