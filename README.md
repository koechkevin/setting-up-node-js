# setting-up-node-js
### How to set up
- clone this repository at `https://github.com/koechkevin/setting-up-node-js.git`
- cd into the folder `cd setting-up-node-js`
- create a .env file ` touch .env` and add the following variables in the format below.
```
export DATABASE_NAME=
export DATABASE_USER=
export DATABASE_PASSWORD=
export PORT=5000
export SECRET_KEY=
```
- Follow the steps [here](https://yarnpkg.com/lang/en/docs/install/#mac-stable) to install yarn
- run `yarn install`
- run `yarn migrate`.
- run `yarn dev`.

- Access the endpoints below on postman
```$xslt
POST: api/v1/users (all users)
GET: api/v1/users (Super Administrator) include page parameter
POST: api/v1/users/login (all users) to obtain a token
PUT: api/v1/users/roles/:email(Super Administrator) to assign users roles
```