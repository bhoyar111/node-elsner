#) npm init  ->create package.json file
	* package name : (backend) skr
	* description : software farming 
	* keywords : skr
	* author : akash
	* license: (ISC) MIT

#) npm commands
    npm i @hapi/joi bcryptjs body-parser morgan dotenv express cors jsonwebtoken mysql2 sequelize --save

* @hapi/joi    -> for validation.
* bcryptjs     -> encrypted data to be converted to decrypted for ex. password.
* body-parser  -> req.body's shape is based on user-controlled input.
* morgan       -> There are various predefined formats provided:
* dotenv       -> * Robust routing.
		  * Focus on high performance.
		  * Super-high test coverage.
                  * HTTP helpers (redirection, caching, etc).
                  * View system supporting 14+ template engines.
                  * Content negotiation.
                  * Executable for generating applications quickly.
* Cors         -> CORS is a node.js package for providing a Connect/Express middleware that can       be used to enable CORS with various options.
* jsonwebtoken -> Returns the JsonWebToken as string.
* mysql2       -> Extended support for Encoding and Collation.
* sequelize    -> Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.
		  It features solid transaction support, relations, eager and lazy loading, read replication and more.


#) npm install babel-preset-env --save-dev

   *  is a smart preset that allows you to use the latest JavaScript without 
       needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s).
       This both makes your life easier and JavaScript bundles smaller!

#) npm install babel-cli --save

  * Babel comes with a built-in CLI which can be used to compile files from the command line. 



#) npm install babel-core --save

  * See our website @babel/core for more information or the issues associated with this package.

#) create file on root .babelrc  and put the below content

------------------------------------
-- run touch .babelrc
{
    "presets": ["env"]
}
------------------------------------

------------------------------------

#) npm install --save-dev babel-plugin-transform-es2015-destructuring

	* Compile ES2015 destructuring to ES5
	* converted to ES6 to ES5

&

#) npm install --save-dev babel-plugin-transform-object-rest-spread

	* This plugin allows Babel to transform rest properties for object destructuring assignment and spread properties for object literals.
	* Rest Property
	  let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
	  console.log(x); // 1
	  console.log(y); // 2
	  console.log(z); // { a: 3, b: 4 }
	* Spread Properties
	  let n = { x, y, ...z };
	  console.log(n); // { x: 1, y: 2, a: 3, b: 4 }.


{
  "presets": ["react", "es2015"],
  "plugins": ["transform-es2015-destructuring", "transform-object-rest-spread"]
}

#) Create new file on root  .sequelizerc for set path of model, migration and seeder

	const path = require('path');

module.exports = {
    'config': path.resolve('db/config', 'database.js'),
    'models-path': path.resolve('db', 'models'),
    'seeders-path': path.resolve('db', 'seeders'),
    'migrations-path': path.resolve('db', 'migrations')
};


#) For install nodemon globally
npm install nodemon -g

#) sequelize cli commands
npm install sequelize-cli -g

#) For creating basic model configuration
npx sequelize-cli init

------------------------------------------------------------------------------------------------------------------------------

#)  For creating model and migration both at a time
npx sequelize-cli model:generate --name User --attributes firstName:string

sequelize commands
#)  For creating migration table
sequelize migration:create --name create_users_table

#) For running migration
sequelize db:migrate

#) For undo all migration
sequelize db:migrate:undo:all

#)  For creating seeder file
sequelize seed:generate --name demo-user

#) For running seeder file
sequelize db:seed:all


#) For creating Controller file run command from root of folder
touch controllers/UserController.js

#)  For creating a secret token key
run below code in terminal
    node
    require('crypto').randomBytes(64).toString('hex')

#) Add This to package.json file

"scripts": {
    "start": "nodemon --exec babel-node app.js",
}

-- For Run Project
- npm start

#) Create new file app.js on root 

#) db/config/database.js file changes as per .env file 
