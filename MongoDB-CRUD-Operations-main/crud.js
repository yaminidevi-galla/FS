// MongoDB CRUD Operations
// College Student Management System

use collegeDB

// CREATE - Add a student
db.students.insertOne({
    name: "Ravi",
    rollNo: "A24126552281",
    branch: "AIML",
    marks: 85
})

// CREATE - Add another student
db.students.insertOne({
    name: "Anu",
    rollNo: "A24126552282",
    branch: "CSE",
    marks: 90
})

// READ - Display all students
db.students.find()

// READ - Find student by roll number
db.students.findOne({
    rollNo: "A24126552281"
})

// UPDATE - Update student's marks
db.students.updateOne(
    { rollNo: "A24126552281" },
    { $set: { marks: 92 } }
)

// DELETE - Delete student
db.students.deleteOne({
    rollNo: "A24126552282"
})

// Display final records
db.students.find()