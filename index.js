const mongoose = require('mongoose');

// MongoDB Connection URI
const MONGO_URI = 'mongodb://localhost:27017/Week8';
mongoose.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;

// Handle connection events
db.on('error', (err) => {
    console.log("Error occurred during connection: " + err);
});

db.once('connected', () => {
    console.log(`Connected to ${MONGO_URI}`);
});

// Define Schema
const PersonScheme = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    Gender: String,
    Salary: Number
});

// Create Model
const person_doc = mongoose.model('modelname', PersonScheme, 'personCollection');

// Adding a Single Document
const doc1 = new person_doc({ name: 'Jacky', age: 362, Gender: "Male", Salary: 3456 });

doc1.save()
    .then((doc1) => {
        console.log("New Article Has been Added Into Your Database.", doc1);
    })
    .catch((err) => {
        console.error(err);
    });

// Adding Multiple Documents
const manypersons = [
    { name: 'Simon', age: 42, Gender: "Male", Salary: 3456 },
    { name: 'Neesha', age: 23, Gender: "Female", Salary: 1000 },
    { name: 'Mary', age: 27, Gender: "Female", Salary: 5402 },
    { name: 'Mike', age: 40, Gender: "Male", Salary: 4519 }
];

person_doc.insertMany(manypersons)
    .then(() => {
        console.log("Data inserted");
    })
    .catch((error) => {
        console.log(error);
    });

// Fetching All Documents (Limit to 5)
person_doc.find().limit(5)
    .then(docs => {
        console.log("Documents:", docs);
    })
    .catch(err => {
        console.error(err);
    });

// Fetching Documents with Filtering Criteria
person_doc.find({ Gender: "Female", age: { $gt: 25 } })
    .then(docs => {
        console.log("Filtered Documents:", docs);
    })
    .catch(err => {
        console.error(err);
    });

// Counting Total Documents
person_doc.countDocuments()
    .then(count => {
        console.log("Total Documents Count:", count);
    })
    .catch(err => {
        console.error(err);
    });

// Deleting Documents by Criteria
person_doc.deleteMany({ age: { $gte: 25 } })
    .exec()
    .then(docs => {
        console.log('Deleted documents:', docs);
    })
    .catch(error => {
        console.log(error);
    });

// Updating Documents by Criteria
person_doc.updateMany({ Gender: "Female" }, { Salary: 5555 })
    .exec()
    .then(docs => {
        console.log("Update Successful:", docs);
    })
    .catch(error => {
        console.log(error);
    });
