# MongoDB and Mongoose Learning Project

This project demonstrates how to use MongoDB with Mongoose in a Node.js application.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure MongoDB Atlas URI
Edit the `.env` file and replace the placeholder with your actual MongoDB Atlas connection string:
```
MONGO_URI='mongodb+srv://username:password@cluster.mongodb.net/database-name'
```

### 3. Run the Project
```bash
npm start
```

### 4. Run Tests
```bash
npm test
```

## Project Structure

- **server.js**: Contains the Person schema, model definition, and all CRUD operation functions
- **test.js**: Test file that demonstrates all MongoDB/Mongoose operations
- **.env**: Environment variables file (contains MongoDB URI)
- **package.json**: Project dependencies and scripts

## Features Implemented

✅ MongoDB connection using Mongoose  
✅ Person schema with required validations  
✅ Create and save a single record  
✅ Create multiple records with Model.create()  
✅ Find documents using Model.find()  
✅ Find single document using Model.findOne()  
✅ Find by ID using Model.findById()  
✅ Update documents with find, edit, and save  
✅ Update documents using findOneAndUpdate()  
✅ Delete documents using findByIdAndRemove()  
✅ Delete multiple documents using Model.remove()  
✅ Chain query helpers for advanced searches  

## Code Comments

All code has been thoroughly commented to explain:
- Purpose of each function
- Mongoose schema field definitions
- How each CRUD operation works
- Query parameters and options
- Error handling patterns
