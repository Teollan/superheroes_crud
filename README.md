# Superheroes CRUD

A basic CRUD application with React, Espress.js, PostgreSQL and Google Cloud Service. 

Allows users to:
- Create, edit and remove a superhero. When creating / editing, able to assign and remove images from a superhero.
- View a list all the superheros, seeing only one image for each, and it’s nickname, with pagination, showing 5 items at once.
- View the details of one particular superhero with all its information and images by clicking on the card.

### To run locally:
For frontend:
```bash 
  cd client
  npm install
  npm run dev
```

For backend:
```bash
  cd server
  npm install
  npm run dev
```
you'll also need a `.env` file with `PORT`, `DATABASE_URL`, `BUCKET_NAME` and `GOOGLE_APPLICATION_CREDENTIALS` for the project to work.

### Special considerations
 - On the first go, server might take a few minutes to spin up. It's a hosting issue.
 - UI/UX is a bit trash, but the most interesting stuff is in the back.
