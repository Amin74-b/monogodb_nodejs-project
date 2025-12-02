// Load environment variables from .env file
require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB Atlas using Mongoose
// Using the URI from environment variables with connection options
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

// ============================================
// SCHEMA AND MODEL DEFINITION
// ============================================

// Define the Person schema with the required fields and validations
const personSchema = new mongoose.Schema({
  // name: required string field
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  
  // age: optional number field
  age: {
    type: Number
  },
  
  // favoriteFoods: array of strings to store food preferences
  favoriteFoods: {
    type: [String],
    default: []
  },
  
  // Additional optional fields for better data structure
  email: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  }
});

// Create the Person model based on the schema
const Person = mongoose.model('Person', personSchema);

// ============================================
// CRUD OPERATIONS
// ============================================

// 1. CREATE AND SAVE A RECORD OF A MODEL
// Function to create and save a single person document
const createAndSavePerson = (done) => {
  // Create a new person instance with sample data
  const person = new Person({
    name: 'John Doe',
    age: 25,
    favoriteFoods: ['pizza', 'pasta', 'salad']
  });

  // Save the document to the database using async/await pattern
  person.save()
    .then(data => {
      console.log('Person saved successfully:', data);
      done(null, data);
    })
    .catch(err => {
      console.error('Error saving person:', err);
      done(err);
    });
};

// 2. CREATE MANY RECORDS WITH model.create()
// Function to create multiple person documents at once
const createManyPeople = (arrayOfPeople, done) => {
  // Use Model.create() to insert multiple documents in one operation
  Person.create(arrayOfPeople)
    .then(data => {
      console.log('Multiple people created:', data);
      done(null, data);
    })
    .catch(err => {
      console.error('Error creating people:', err);
      done(err);
    });
};

// 3. USE model.find() TO SEARCH YOUR DATABASE
// Function to find all people with a given name
const findPeopleByName = (name, done) => {
  // Find all documents where name matches the search parameter
  Person.find({ name: name })
    .then(data => {
      console.log('People found:', data);
      done(null, data);
    })
    .catch(err => {
      console.error('Error finding people:', err);
      done(err);
    });
};

// 4. USE model.findOne() TO RETURN A SINGLE MATCHING DOCUMENT
// Function to find one person by their favorite food
const findOnePersonByFood = (food, done) => {
  // Find the first document where favoriteFoods array contains the specified food
  Person.findOne({ favoriteFoods: food })
    .then(data => {
      console.log('Person found:', data);
      done(null, data);
    })
    .catch(err => {
      console.error('Error finding person:', err);
      done(err);
    });
};

// 5. USE model.findById() TO SEARCH YOUR DATABASE BY _id
// Function to find a person by their MongoDB ID
const findPersonById = (personId, done) => {
  // Find a document by its unique _id field
  Person.findById(personId)
    .then(data => {
      console.log('Person found by ID:', data);
      done(null, data);
    })
    .catch(err => {
      console.error('Error finding person by ID:', err);
      done(err);
    });
};

// 6. PERFORM CLASSIC UPDATES BY RUNNING FIND, EDIT, THEN SAVE
// Function to add a food to a person's favorites and save
const updatePersonFood = (personId, done) => {
  // Find the person by ID
  Person.findById(personId)
    .then(person => {
      if (!person) {
        return done(new Error('Person not found'));
      }

      // Add "hamburger" to the person's favorite foods
      person.favoriteFoods.push('hamburger');

      // Mark the favoriteFoods field as modified if using Mixed type
      // Note: Not needed here since we explicitly defined it as [String]
      
      // Save the updated document back to the database
      return person.save();
    })
    .then(data => {
      console.log('Person updated successfully:', data);
      done(null, data);
    })
    .catch(err => {
      console.error('Error in update person food:', err);
      done(err);
    });
};

// 7. PERFORM NEW UPDATES ON A DOCUMENT USING model.findOneAndUpdate()
// Function to find a person by name and update their age to 20
const updatePersonAge = (personName, done) => {
  // Use findOneAndUpdate to find and update in one operation
  // The { new: true } option returns the updated document instead of the original
  Person.findOneAndUpdate(
    { name: personName }, // query to find the person
    { age: 20 }, // update to apply
    { new: true } // option to return the updated document
  )
    .then(data => {
      console.log('Person age updated:', data);
      done(null, data);
    })
    .catch(err => {
      console.error('Error updating person age:', err);
      done(err);
    });
};

// 8. DELETE ONE DOCUMENT USING model.findByIdAndRemove()
// Function to delete a person by their ID
const removePersonById = (personId, done) => {
  // Use findByIdAndDelete (newer version of findByIdAndRemove)
  // to find and delete a document
  Person.findByIdAndDelete(personId)
    .then(data => {
      console.log('Person removed:', data);
      done(null, data);
    })
    .catch(err => {
      console.error('Error removing person:', err);
      done(err);
    });
};

// 9. DELETE MANY DOCUMENTS WITH model.remove()
// Function to delete all people with a specific name
const removeAllPeopleByName = (name, done) => {
  // Use Model.deleteMany() (newer version of remove()) to delete multiple documents
  Person.deleteMany({ name: name })
    .then(response => {
      console.log('People removed. Response:', response);
      done(null, response);
    })
    .catch(err => {
      console.error('Error removing people:', err);
      done(err);
    });
};

// 10. CHAIN SEARCH QUERY HELPERS TO NARROW SEARCH RESULTS
// Function to find people who like burritos, sorted by name, limited to 2, without age
const findBurritoLovers = (done) => {
  // Chain multiple query helpers together:
  // find() - query for documents
  // sort() - order results by name ascending (1 = ascending, -1 = descending)
  // limit() - restrict to 2 results
  // select() - exclude the age field (negative sign means exclude)
  // exec() - execute the query with a promise
  Person.find({ favoriteFoods: 'burritos' })
    .sort({ name: 1 }) // Sort by name in ascending order
    .limit(2) // Return only 2 documents
    .select('-age') // Exclude the age field from results
    .exec()
    .then(data => {
      console.log('Burrito lovers found:', data);
      done(null, data);
    })
    .catch(err => {
      console.error('Error finding burrito lovers:', err);
      done(err);
    });
};

// Export all functions for use in tests or other modules
module.exports = {
  Person,
  createAndSavePerson,
  createManyPeople,
  findPeopleByName,
  findOnePersonByFood,
  findPersonById,
  updatePersonFood,
  updatePersonAge,
  removePersonById,
  removeAllPeopleByName,
  findBurritoLovers
};
