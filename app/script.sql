-- Insertando ingredientes
INSERT INTO ingredientes (nombre, id_origen) VALUES
('Leche', 1),
('Carne', 1),
('Huevo', 1),
('Queso', 1),
('Mantequilla', 1),
('Manzana', 2),
('Zanahoria', 2),
('Espinaca', 2),
('Tomate', 2),
('Papa', 2),
('Sal', 3),
('Azúcar', 3),
('Agua', 3),
('Bicarbonato', 3),
('Carbonato de sodio', 3),
('Pollo', 1),
('Pescado', 1),
('Aceite de oliva', 2),
('Harina de trigo', 2),
('Cacao', 2);

-- Insertando categorías
INSERT INTO categorias (nombre, descripcion) VALUES
('Postres', 'Recetas dulces para el final de la comida'),
('Sopas', 'Platos líquidos y calientes'),
('Ensaladas', 'Platos fríos a base de vegetales'),
('Carnes', 'Platos principales con carne como ingrediente principal'),
('Pescados', 'Recetas con pescado como base'),
('Pastas', 'Platos elaborados con pasta'),
('Panadería', 'Productos horneados como panes y bollos'),
('Bebidas', 'Líquidos para acompañar las comidas'),
('Vegetariano', 'Recetas sin productos de origen animal'),
('Vegano', 'Recetas sin productos de origen animal ni derivados'),
('Rápido', 'Platos que se preparan en poco tiempo'),
('Gourmet', 'Recetas elaboradas y sofisticadas'),
('Desayunos', 'Platos para la primera comida del día'),
('Almuerzos', 'Platos principales para el mediodía'),
('Cenas', 'Platos ligeros para la noche'),
('Snacks', 'Aperitivos o bocadillos'),
('Internacional', 'Recetas de diferentes culturas'),
('Tradicional', 'Platos típicos de una región'),
('Sin gluten', 'Recetas aptas para celíacos'),
('Fitness', 'Platos saludables y bajos en calorías');

-- Insertando recetas
INSERT INTO recetas (nombre, pasos, es_vegano, es_vegetariano, foto, esta_aprobada) VALUES
('Ensalada César', '1. Lavar la lechuga. 2. Preparar el aderezo. 3. Mezclar todo.', FALSE, TRUE, 'ensalada_cesar.jpg', TRUE),
('Sopa de Tomate', '1. Cocinar los tomates. 2. Licuar con especias. 3. Servir caliente.', TRUE, TRUE, 'sopa_tomate.jpg', TRUE),
('Pollo al Horno', '1. Marinar el pollo. 2. Hornear por 40 minutos. 3. Servir.', FALSE, FALSE, 'pollo_horno.jpg', TRUE),
('Tarta de Manzana', '1. Preparar la masa. 2. Cocinar las manzanas. 3. Hornear.', TRUE, TRUE, 'tarta_manzana.jpg', TRUE),
('Pasta Alfredo', '1. Cocinar la pasta. 2. Preparar la salsa Alfredo. 3. Mezclar.', FALSE, TRUE, 'pasta_alfredo.jpg', TRUE),
('Pizza Margarita', '1. Preparar la masa. 2. Añadir salsa y queso. 3. Hornear.', FALSE, TRUE, 'pizza_margarita.jpg', TRUE),
('Batido de Fresa', '1. Licuar fresas con leche. 2. Servir frío.', FALSE, TRUE, 'batido_fresa.jpg', TRUE),
('Hamburguesa Vegana', '1. Preparar la carne vegana. 2. Montar la hamburguesa. 3. Servir.', TRUE, TRUE, 'hamburguesa_vegana.jpg', TRUE),
('Arroz con Pollo', '1. Cocinar el arroz. 2. Preparar el pollo. 3. Mezclar.', FALSE, FALSE, 'arroz_pollo.jpg', TRUE),
('Brownies', '1. Mezclar los ingredientes. 2. Hornear por 30 minutos. 3. Cortar en porciones.', TRUE, TRUE, 'brownies.jpg', TRUE),
('Ceviche', '1. Marinar el pescado. 2. Añadir limón y especias. 3. Servir frío.', FALSE, FALSE, 'ceviche.jpg', TRUE),
('Tacos de Carne', '1. Preparar la carne. 2. Calentar las tortillas. 3. Montar los tacos.', FALSE, FALSE, 'tacos_carne.jpg', TRUE),
('Gazpacho', '1. Licuar los vegetales. 2. Refrigerar. 3. Servir frío.', TRUE, TRUE, 'gazpacho.jpg', TRUE),
('Panqueques', '1. Mezclar los ingredientes. 2. Cocinar en sartén. 3. Servir con miel.', TRUE, TRUE, 'panqueques.jpg', TRUE),
('Lasaña de Verduras', '1. Preparar las verduras. 2. Montar la lasaña. 3. Hornear.', TRUE, TRUE, 'lasana_verduras.jpg', TRUE),
('Croquetas de Jamón', '1. Preparar la masa. 2. Freír las croquetas. 3. Servir.', FALSE, FALSE, 'croquetas_jamon.jpg', TRUE),
('Ensalada de Frutas', '1. Cortar las frutas. 2. Mezclar en un bol. 3. Servir frío.', TRUE, TRUE, 'ensalada_frutas.jpg', TRUE),
('Sushi', '1. Preparar el arroz. 2. Montar los rollos. 3. Cortar y servir.', FALSE, FALSE, 'sushi.jpg', TRUE),
('Crema de Calabaza', '1. Cocinar la calabaza. 2. Licuar con especias. 3. Servir caliente.', TRUE, TRUE, 'crema_calabaza.jpg', TRUE),
('Churros', '1. Preparar la masa. 2. Freír los churros. 3. Servir con chocolate.', TRUE, TRUE, 'churros.jpg', TRUE);

-- Insertando en tablas intermedias

-- receta_ingrediente (ingredientes que usa cada receta)
INSERT INTO receta_ingrediente (receta_id, ingrediente_id) VALUES
(1, 7),  -- Ensalada César usa zanahoria (por ejemplo)
(1, 8),  -- y espinaca
(2, 9),  -- Sopa de Tomate usa tomate
(3, 16), -- Pollo al horno usa pollo
(4, 6),  -- Tarta de Manzana usa manzana
(5, 18), -- Pasta Alfredo usa harina de trigo
(6, 8),  -- Pizza Margarita usa espinaca
(7, 1),  -- Batido de Fresa usa leche
(8, 18), -- Hamburguesa vegana usa harina de trigo
(9, 16), -- Arroz con pollo usa pollo
(10, 20);-- Brownies usa cacao

-- receta_categoria (categorías asociadas a recetas)
INSERT INTO receta_categoria (receta_id, categoria_id) VALUES
(1, 3),  -- Ensalada César -> Ensaladas
(2, 2),  -- Sopa de Tomate -> Sopas
(3, 4),  -- Pollo al Horno -> Carnes
(4, 1),  -- Tarta de Manzana -> Postres
(5, 6),  -- Pasta Alfredo -> Pastas
(6, 6),  -- Pizza Margarita -> Pastas
(7, 8),  -- Batido de Fresa -> Bebidas
(8, 9),  -- Hamburguesa Vegana -> Vegetariano
(9, 4),  -- Arroz con Pollo -> Carnes
(10, 1), -- Brownies -> Postres
(11, 5), -- Ceviche -> Pescados
(12, 4), -- Tacos de Carne -> Carnes
(13, 2), -- Gazpacho -> Sopas
(14, 13),-- Panqueques -> Desayunos
(15, 9), -- Lasaña de Verduras -> Vegetariano
(16, 4), -- Croquetas de Jamón -> Carnes
(17, 3), -- Ensalada de Frutas -> Ensaladas
(18, 5), -- Sushi -> Pescados
(19, 2), -- Crema de Calabaza -> Sopas
(20, 1); -- Churros -> Postres
