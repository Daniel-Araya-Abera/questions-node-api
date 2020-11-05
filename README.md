# questions-node-api
## questions-node-api is a nodejs JSON api 
It has 
- auth with passport(signup, signin of users)
- full CRUD operation of questions
- mongodb for database

## ensureAuthentication middleware protects needed routes.

## Major Endpoints:

### Users/Authentication
- POST localhost:3000/users/register
 {
    "firstName": "John",
    "middleName": "P",
    "lastName": "Ryan",
    "username": "jackryan",
    "password": "password",
    "email": "jack@gmail.com"
}
- POST localhost:3000/users/login
  ```json
  {
    "password": "password",
    "email": "user1@gmail.com"
  }
  ```
- GET localhost:3000/users/logout


### Questions
- GET localhost:3000/questions
- GET localhost:3000/questions/5f994e19022c7419d843271d
- POST localhost:3000/questions
  ```json
  {
      "title": "Trip to Addis Ababa",
      "description": "Hi, I'm coming to Addis Ababa, Ethiopia in a few days and I was wondering...",
      "image": "image path :)",
      "userID": "002",
      "categoryID": "1",
      "activeUser": true
  }
  ```

- PATCH localhost:3000/questions/5f99dc3fd4af7635d808c1d7
 ```json
 {
    "title": "another title",
    "description": "EDIT: Hi, I'm coming to Addis Ababa, Ethiopia next week and I was wondering...",
    "image": "CHANGED IMAGE PATH HERE",
    "userID": "002",
    "categoryID": "1",
    "activeUser": true
 }
 ```

- PUT localhost:3000/questions/5f994e19022c7419d843271d
 ```json
 {
     "title": "Do you know places to visit in Addis?",
     "description": "Hi, I'm coming to Addis Ababa, Ethiopia in a few days..",
     "image": "updated image path :)",
 }
 ```
- DELETE localhost:3000/questions/5f994e19022c7419d843271d
