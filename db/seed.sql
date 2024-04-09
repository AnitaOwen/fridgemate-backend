-- db/seed.sql
\c jwt_auth

INSERT INTO users (username, password_hash, email, created_at, updated_at)
VALUES 
('demo', '$2b$10$.z68x3792U9LyBwmghfsKexstMO7i0SeNCoDmeJa7bEFPQBnZU3bK', 'demo@example.com', NOW(), NOW());

INSERT INTO fridges (location, notes, user_id)
VALUES 
('Kitchen', 'Main fridge in the kitchen', 1),
('Garage', 'Extra fridge in the garage', 1);

-- INSERT INTO categories (name)
-- VALUES
-- (1'Dairy'),
-- (2'Vegetables'),
-- (3'Meat'),
-- (4'Condiments'),
-- (5'Fruits'),
-- (6'Beverages'),
-- (7'Seafood'),
-- (8'Frozen'),
-- (9'Misc');

INSERT INTO items (name, expiration_date, amount_paid, fridge_id, user_id, category)
VALUES
('Whole milk', '2024-04-15', 350, 1, 1,'Dairy'),
('Ricotta cheese', '2024-04-20', 270, 1, 1, 'Dairy'),
('Chicken breast', '2024-04-18', 650, 1, 1, 'Meat'),
('Eggs', '2024-04-25', 300, 1, 1, 'Dairy'),
('Orange juice (no pulp)', '2024-04-15', 350, 1, 1, 'Beverage'),
('Greek yogurt', '2024-04-14', 600, 1, 1, 'Dairy'),
('Tilapia', '2024-04-22', 600, 1, 1, 'Seafood'),
('Italian sausage', '2024-04-19', 500, 1, 1, 'Meat'),
('Fruit salad', '2024-04-18', 300, 1, 1, 'Fruit'),
('Mayonnaise', '2024-05-10', 600, 1, 1, 'Condiment'),
('Salsa', '2024-05-10', 400, 1, 1, 'Condiment'),
('Spinach dip', '2024-05-10', 400, 1, 1, 'Other'),
('Skim milk', '2024-05-10', 350, 2, 1, 'Dairy'),
('Orange juice (with pulp)', '2024-05-20', 350, 2, 1, 'Beverage'),
('Cream cheese', '2024-06-15', 600, 2, 1, 'Dairy'),
('Egg salad', '2024-04-18', 500, 1, 1, 'Other'),
('Caesar salad with chicken', '2024-04-29', 500, 1, 1, 'Other'),
('Birthday cake', '2024-04-29', NULL , 2, 1, 'Sweet'),
('Leftover pizza', '2024-04-20', NULL , 2, 1, 'Other');
