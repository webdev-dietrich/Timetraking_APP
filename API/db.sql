CREATE DATABASE IF NOT EXISTS timetracking;

GRANT USAGE ON *.* TO 'testuser_abc'@'localhost' IDENTIFIED BY 'Testpassw0rd_abc';
GRANT ALL PRIVILEGES ON timetracking.* TO 'testuser_abc'@'localhost';

FLUSH PRIVILEGES;