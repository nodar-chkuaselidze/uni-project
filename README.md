University project
=====

This is MEAN stack application.

Installation instructions
----
  + `npm install -g gulp nodemon supervisor bower` (may need `sudo`)
  + `npm install`
  + `bower install`
  + `gulp init` - Init DB(below)
  + `gulp sass` - compile sass files

Local configs
----

Now we create config file `configs/local.json` using template:

```json
{
  "port" : 5000,
  "db"   : "mongodb://localhost/quizEngine",
  "admin": {
    "email"     : "email@example.com",
    "firstName" : "first name",
    "lastName"  : "last name",
    "password"  : "paroli"
  },
  "dev-autoAuth" : false
}
```

+ `admin` - This config param is used on DB init, you can change password later from AdminPanel.
+ `port` - Web server port.
+ `db` - MongoDb configuration
+ `dev-autoAuth` - This is boolean param and works only in `development` mode. If set true, you will be automatically authorized to admin panel (for development purposes).

Init DB
---
You can call `gulp init` to create admin user (based on `configs/local.json`)

Run Server
---
It's simple as `node app.js`

Run server in Development MODE
---
You can either run `gulp` or add some DEBUG params like: `DEBUG="app:*" gulp`

Run server in `repl`
---
`gulp console` - Useful when you want to debug models and helpers. You can access model class/objects directly.
