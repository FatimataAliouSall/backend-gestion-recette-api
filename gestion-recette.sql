-- Création de la table `recipes`
CREATE TABLE IF NOT EXISTS recipes (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL UNIQUE,
    ingredient TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

-- Insertion de données dans la table `recipes`
INSERT INTO recipes (title, ingredient, type) VALUES
('Salade', 'Laitue, Tomates, Concombre', 'entrée'),
('Poulet rôti', 'Poulet, Herbes, Pommes de terre', 'plat'),
('Soupe aux légumes', 'Carottes, Poireaux, Pommes de terre', 'entrée'),
('Tarte aux pommes', 'Pommes, Sucre, Beurre, Pâte brisée', 'dessert');
