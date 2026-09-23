CREATE TABLE entreprise (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL
);

CREATE TABLE offre (
    id INT PRIMARY KEY AUTO_INCREMENT,
    entreprise_id INT NOT NULL,
    titre VARCHAR(255) NOT NULL,
    ville VARCHAR(100) NOT NULL,
    typeContrat VARCHAR(100) NOT NULL,
    datePublication DATE NOT NULL,
    descriptionCourte TEXT,
    descriptionLongue TEXT,
    profilRecherche TEXT,
    lienCandidature VARCHAR(255),
    emailContact VARCHAR(255),

    CONSTRAINT fk_offre_entreprise
        FOREIGN KEY (entreprise_id)
        REFERENCES entreprise(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE technologie (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL
);

CREATE TABLE offre_technologie (
    offre_id INT NOT NULL,
    technologie_id INT NOT NULL,

    PRIMARY KEY (offre_id, technologie_id),

    CONSTRAINT fk_offre_technologie_offre
        FOREIGN KEY (offre_id)
        REFERENCES offre(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_offre_technologie_technologie
        FOREIGN KEY (technologie_id)
        REFERENCES technologie(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);