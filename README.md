# MongoDB and Mongoose Project

A comprehensive Node.js project demonstrating MongoDB Atlas integration with Mongoose, implementing complete CRUD operations and advanced database querying techniques.

## Overview

This project provides a practical implementation of MongoDB and Mongoose fundamentals, including schema design, data validation, and all essential database operations (Create, Read, Update, Delete). Perfect for learning database management in Node.js applications.

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn package manager

### Installation

1. **Clone or download** this project
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure MongoDB Connection:**
   - Open the `.env` file
   - Replace `<db_password>` with your MongoDB Atlas password
   ```
   MONGO_URI='mongodb+srv://cinamoh152:<your-password>@cluster0.b5fazqu.mongodb.net/?appName=Cluster0'
   ```

4. **Run tests to verify setup:**
   ```bash
   npm test
   ```

## Project Structure

```
monogodb_nodejs-project/
├── server.js          # Mongoose connection, schema, and all CRUD functions
├── test.js            # Complete test suite demonstrating all operations
├── .env               # Environment variables (MongoDB URI)
├── package.json       # Project dependencies and scripts
└── README.md          # This file
```

## Core Features

### 1. **Database Schema**
- **Person Model** with fields:
  - `name` (String, Required)
  - `age` (Number)
  - `favoriteFoods` (Array of Strings)
  - `email` (String, Unique, Optional)

### 2. **CRUD Operations Implemented**

#### Create Operations
- ✅ **createAndSavePerson()** - Create and save a single document
- ✅ **createManyPeople()** - Bulk insert multiple documents using Model.create()

#### Read Operations
- ✅ **findPeopleByName()** - Find all documents matching a query
- ✅ **findOnePersonByFood()** - Find first document by food preference
- ✅ **findPersonById()** - Retrieve document by MongoDB _id

#### Update Operations
- ✅ **updatePersonFood()** - Find, modify array, and save (classic pattern)
- ✅ **updatePersonAge()** - Update document using findOneAndUpdate() with { new: true }

#### Delete Operations
- ✅ **removePersonById()** - Delete single document by _id
- ✅ **removeAllPeopleByName()** - Delete multiple documents by name

### 3. **Advanced Query Techniques**
- ✅ **findBurritoLovers()** - Demonstrates query chaining:
  - `.find()` - Filter documents
  - `.sort()` - Order results
  - `.limit()` - Restrict number of results
  - `.select()` - Project specific fields
  - `.exec()` - Execute with promise handling

## How to Use

### Running Tests
```bash
npm test
```
This executes the complete test suite that demonstrates all 10 CRUD operations sequentially.

### Integrating into Your App
```javascript
const {
  Person,
  createAndSavePerson,
  findPeopleByName,
  // ... import other functions as needed
} = require('./server');

// Use in your application
createAndSavePerson((err, data) => {
  if (err) console.error(err);
  else console.log('Person created:', data);
});
```

## Code Quality

### Comprehensive Comments
Every function includes detailed comments explaining:
- Purpose and use case
- Parameter descriptions
- How each Mongoose operation works
- Error handling patterns
- Expected return values

### Promise-Based Pattern
All functions use modern async patterns (.then()/.catch()) for compatibility with Mongoose 7.x and modern JavaScript practices.

## MongoDB Atlas Setup Guide

1. **Create Database User:**
   - Go to Database Access
   - Add new database user with username and password
   - Note: This is different from your Atlas account login

2. **Whitelist IP Address:**
   - Go to Network Access
   - Add your IP address or allow 0.0.0.0/0 for development

3. **Get Connection String:**
   - Go to Clusters → Connect
   - Choose "Connect your application"
   - Copy the connection string and replace `<password>` with your database user password

## Technologies Used

- **Node.js** - JavaScript runtime
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB object modeling (v7.x)
- **dotenv** - Environment variable management
- **Express** - Web framework (for future expansion)

## Error Handling

The project demonstrates proper error handling:
- Database connection errors
- Validation errors
- Authentication failures
- Not found scenarios
- Update conflicts

All functions include try-catch patterns and callback error handling.

## Next Steps

- Add Express routes to expose API endpoints
- Implement user authentication
- Add data validation middleware
- Create database indexes for performance
- Add pagination for large result sets
- Implement transactions for multi-document operations

## Troubleshooting

### "Authentication failed" error
- Verify MongoDB user credentials in `.env`
- Check IP whitelist in MongoDB Atlas Network Access
- Ensure database user exists in Database Access section

### Connection timeout
- Check internet connection
- Verify MongoDB Atlas cluster is active
- Confirm IP address is whitelisted

### Model.save() callback error
- Ensure Mongoose version 7.x is installed
- Use promise-based .then()/.catch() instead of callbacks

## License

MIT

## Author

MongoDB and Mongoose Learning Project
