# Timetraking_APP

Timetraking APP with API for demonstatration

you can see a tech demo on https://timetracking.der-dittsche.de

## Praparation

1. install node
2. install a SQL Server like mariadb or mysql and start the service
3. install Visual Studio Code

## Manual to use (It's only for local Using!)

1. open the repository with VSCode and open the terminal
2. navigate to ./APP and run `npm install`
3. navigate to ./API and run `npm install`
4. run `mysql -u your_username -p -h localhost -P 3306 your_db_name < ./api/db.sql` (you have to use your credentials)
5. navigate to ./APP an run `npm start`
6. use a browser of your choise and go to http://localhost:3000
7. create a user by the registration part of the app. **The first user is an admin user.**

If you want to use the app public you have to configure your own API endpoint.
