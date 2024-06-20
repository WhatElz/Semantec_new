-- Datenbank und Tabellen erstellen
DROP DATABASE IF EXISTS SemanTec;
CREATE DATABASE IF NOT EXISTS SemanTec;
USE SemanTec;

CREATE TABLE Nutzer
(
    ID            INT AUTO_INCREMENT PRIMARY KEY,
    --Name          VARCHAR(255),
    --Vorname       VARCHAR(255),
    Email         VARCHAR(255),
    pw      VARCHAR(255),
    UnternehmenID INT,
    isAdmin       BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (UnternehmenID) REFERENCES Unternehmen (ID)
);

-- Kann raus
CREATE TABLE Unternehmen
(
    ID   INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255)
);
-- Kann raus?
CREATE TABLE Fragen
(
    ID         INT AUTO_INCREMENT PRIMARY KEY,
    Name       VARCHAR(255),
    Gewichtung INT
);

-- optional
CREATE TABLE Antworten
(
    ID        INT AUTO_INCREMENT PRIMARY KEY,
    Antwort   VARCHAR(255),
    Kategorie VARCHAR(255),
    FrageID   INT,
    FOREIGN KEY (FrageID) REFERENCES Fragen (ID)
);


CREATE TABLE Einschaetzung
(
    ID        INT AUTO_INCREMENT PRIMARY KEY,
    Score     INT,
    Kategorie VARCHAR(255),
    NutzerID  INT,
    FOREIGN KEY (NutzerID) REFERENCES Nutzer (ID)
);

CREATE TABLE Angebot
(
    ID              INT AUTO_INCREMENT PRIMARY KEY,
    Name            VARCHAR(255),
    Kategorie       VARCHAR(255),
    Score           INT,
    Bild            VARCHAR(255),
    Beschreibung    VARCHAR(255),
    EinschaetzungID INT,
    FOREIGN KEY (EinschaetzungID) REFERENCES Einschaetzung (ID)
);


-- optional
CREATE TABLE NutzerAntworten
(
    NutzerID  INT,
    AntwortID INT,
    PRIMARY KEY (NutzerID, AntwortID),
    FOREIGN KEY (NutzerID) REFERENCES Nutzer (ID),
    FOREIGN KEY (AntwortID) REFERENCES Antworten (ID)
);

-- Indexe erstellen
CREATE INDEX idx_fragen_gewichtung ON Fragen (Gewichtung);
CREATE INDEX idx_antworten_kategorie ON Antworten (Kategorie);
CREATE INDEX idx_einschaetzung_kategorie ON Einschaetzung (Kategorie);
CREATE INDEX idx_angebot_kategorie ON Angebot (Kategorie);

-- Testdaten einfügen

-- Nutzer
INSERT INTO Nutzer (Name, Vorname, Email, pw, UnternehmenID)
VALUES ('Mustermann', 'Max', 'max@mustermann.de', '1234', 1),
       ('Musterfrau', 'Erika', 'erika@musterfrau.de', '5678', 2),
       ('Müller', 'Hans', 'hans@mueller.de', '91011', 3);

-- Unternehmen
INSERT INTO Unternehmen (Name)
VALUES ('Firma A'),
       ('Firma B'),
       ('Firma C');

-- Fragen
INSERT INTO Fragen (Name, Gewichtung)
VALUES ('Frage 1', 10),
       ('Frage 2', 20),
       ('Frage 3', 30);

-- Antworten
INSERT INTO Antworten (Antwort, Kategorie, FrageID)
VALUES ('Antwort 1A', 'Kategorie 1', 1),
       ('Antwort 1B', 'Kategorie 1', 1),
       ('Antwort 2A', 'Kategorie 2', 2),
       ('Antwort 2B', 'Kategorie 2', 2),
       ('Antwort 3A', 'Kategorie 3', 3),
       ('Antwort 3B', 'Kategorie 3', 3);

-- Einschaetzungen
INSERT INTO Einschaetzung (Score, Kategorie, NutzerID)
VALUES (85, 'Kategorie 1', 1),
       (90, 'Kategorie 2', 2),
       (75, 'Kategorie 3', 3);

-- Angebot
INSERT INTO Angebot (Name, Kategorie, Score, Bild, Beschreibung, EinschaetzungID)
VALUES ('Angebot 1', 'Kategorie 1', 85, 'public/assets/facebook_icon.svg', 'Beschreibung 1', 1),
       ('Angebot 2', 'Kategorie 2', 90, 'public/assets/office_icon.svg', 'Beschreibung 2', 2),
       ('Angebot 3', 'Kategorie 3', 75, 'public/assets/zoom_icon.svg', 'Becshreibung 3', 3);

-- NutzerAntworten
INSERT INTO NutzerAntworten (NutzerID, AntwortID)
VALUES (1, 1),
       (1, 2),
       (2, 3),
       (2, 4),
       (3, 5),
       (3, 6);