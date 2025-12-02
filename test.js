// Test file to demonstrate all the MongoDB/Mongoose operations
require('dotenv').config();
const mongoose = require('mongoose');
const {
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
} = require('./server');

// Helper function to execute tests sequentially
function runTests() {
  console.log('\n=== MONGODB AND MONGOOSE OPERATIONS TEST SUITE ===\n');

  // Test 1: Create and Save a Person
  console.log('Test 1: Creating and saving a person...');
  createAndSavePerson((err, data) => {
    if (err) {
      console.error('Test 1 failed:', err);
      return;
    }

    // Test 2: Create Multiple People
    console.log('\nTest 2: Creating multiple people...');
    const peopleArray = [
      { name: 'Alice', age: 28, favoriteFoods: ['sushi', 'burritos', 'pizza'] },
      { name: 'Bob', age: 30, favoriteFoods: ['burritos', 'tacos'] },
      { name: 'Charlie', age: 26, favoriteFoods: ['hamburger', 'burritos'] },
      { name: 'Mary', age: 35, favoriteFoods: ['salad', 'pasta'] }
    ];

    createManyPeople(peopleArray, (err, people) => {
      if (err) {
        console.error('Test 2 failed:', err);
        return;
      }

      // Test 3: Find by Name
      console.log('\nTest 3: Finding people by name...');
      findPeopleByName('Alice', (err, data) => {
        if (err) {
          console.error('Test 3 failed:', err);
        }

        // Test 4: Find One by Food
        console.log('\nTest 4: Finding one person by favorite food...');
        findOnePersonByFood('pizza', (err, data) => {
          if (err) {
            console.error('Test 4 failed:', err);
          }

          // Test 5: Find by ID
          if (data && data._id) {
            console.log('\nTest 5: Finding person by ID...');
            findPersonById(data._id, (err, foundPerson) => {
              if (err) {
                console.error('Test 5 failed:', err);
              }

              // Test 6: Update Food
              if (foundPerson && foundPerson._id) {
                console.log('\nTest 6: Updating person food...');
                updatePersonFood(foundPerson._id, (err, updated) => {
                  if (err) {
                    console.error('Test 6 failed:', err);
                  }

                  // Test 7: Update Age
                  console.log('\nTest 7: Updating person age...');
                  updatePersonAge('Bob', (err, updated) => {
                    if (err) {
                      console.error('Test 7 failed:', err);
                    }

                    // Test 8: Find Burrito Lovers
                    console.log('\nTest 8: Finding burrito lovers with chaining...');
                    findBurritoLovers((err, burritoLovers) => {
                      if (err) {
                        console.error('Test 8 failed:', err);
                      }

                      // Close the database connection after tests
                      console.log('\n=== ALL TESTS COMPLETED ===\n');
                      mongoose.connection.close();
                    });
                  });
                });
              }
            });
          }
        });
      });
    });
  });
}

// Run tests when script is executed
if (require.main === module) {
  runTests();
}

module.exports = { runTests };
