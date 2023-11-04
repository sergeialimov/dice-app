BEGIN;

-- Reset the tables if they contain data
TRUNCATE TABLE users CASCADE;
ALTER SEQUENCE users_id_seq RESTART WITH 1;
TRUNCATE TABLE bets CASCADE;

-- Insert data into 'users'
INSERT INTO users ("name", "balance") VALUES
('Alice', 100.00),
('Bob', 150.50),
('Charlie', 200.00),
('Diana', 250.75);

-- Insert data into 'bets' (assumes users have ids 1 through 4)
INSERT INTO bets ("userId", "betAmount", "chance", "payout", "win") VALUES
(1, 10.00, 0.5, 0.00, false),
(2, 15.50, 0.75, 23.25, true),
(3, 25.00, 0.4, 0.00, false),
(4, 5.75, 0.8, 9.20, true);

-- Commit the transaction
COMMIT;
