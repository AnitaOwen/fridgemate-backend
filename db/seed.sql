-- db/seed.sql
\c jwt_auth

INSERT INTO users (username, password_hash, email, created_at, updated_at)
VALUES 
('demo', '$2b$10$.z68x3792U9LyBwmghfsKexstMO7i0SeNCoDmeJa7bEFPQBnZU3bK', 'demo@example.com', NOW(), NOW());

INSERT INTO fridges (location, notes, user_id)
VALUES 
('Kitchen', 'Main fridge in the kitchen', 1),
('Garage', 'Extra fridge in the garage', 1)

INSERT INTO categories (name)
VALUES
('Dairy'),
('Vegetables'),
('Meat'),
('Condiments'),
('Fruits'),
('Beverages'),
('Seafood'),
('Frozen'),
('Misc')

INSERT INTO items (name, expiration_date, amount_paid, fridge_id, user_id, category_id)
VALUES
('Whole milk', '2024-04-15', 350, 1, 1, 1),
('Ricotta cheese', '2024-04-20', 270, 1, 1, 1),
('Chicken breast', '2024-04-18', 650, 1, 1, 3),
('Eggs', '2024-04-25', 300, 1, 1, 1),
('Orange juice (no pulp)', '2024-04-15', 350, 1, 1, 6),
('Greek yogurt', '2024-04-14', 600, 1, 1, 1),
('Tilapia', '2024-04-22', 600, 1, 1, 7),
('Italian sausage', '2024-04-19', 500, 1, 1, 3),
('Fruit salad', '2024-04-18', 300, 1, 1, 5),
('Mayonnaise', '2024-05-10', 600, 1, 1, 4),
('Salsa', '2024-05-10', 400, 1, 1, 4),
('Spinach dip', '2024-05-10', 400, 1, 1, 4),
('Skim milk', '2024-05-10', 350, 2, 1, 1),
('Orange juice (with pulp)', '2024-05-20', 350, 2, 1, 6),
('Cream cheese', '2024-06-15', 600, 2, 1, 1),
('Egg salad', '2024-04-18', 500, 1, 1, 9),
('Caesar salad with chicken', '2024-04-29', 500, 1, 1, 9),
('Birthday cake', '2024-04-29', NULL , 2, 1, 9),
('Leftover pizza', '2024-04-20', NULL , 2, 1, 9),
