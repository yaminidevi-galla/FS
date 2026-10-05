const express = require("express");

const app = express();
const PORT = 3000;

// Environment
const ENVIRONMENT = process.env.NODE_ENV || "development";

// Middleware
app.use(express.json());

// Sample data
let users = [
    { id: 1, name: "Ravi", role: "student" },
    { id: 2, name: "Anu", role: "admin" }
];

// =====================================================
// HOME ROUTE
// =====================================================

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Express.js Demo",
        environment: ENVIRONMENT,
        availableRoutes: [
            "GET /users",
            "GET /users/:id",
            "POST /users",
            "PUT /users/:id",
            "PATCH /users/:id",
            "DELETE /users/:id",
            "GET /search?role=student"
        ]
    });
});

// =====================================================
// GET METHOD
// =====================================================

// GET - Retrieve all users
app.get("/users", (req, res) => {
    res.json({
        method: "GET",
        operation: "Retrieve all users",
        data: users
    });
});

// GET - Retrieve one user using route parameter
app.get("/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json({
        method: "GET",
        operation: "Retrieve one user",
        data: user
    });
});

// =====================================================
// POST METHOD
// =====================================================

// POST - Create a new user
app.post("/users", (req, res) => {

    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        role: req.body.role
    };

    users.push(newUser);

    res.status(201).json({
        method: "POST",
        operation: "Create new user",
        message: "User created successfully",
        data: newUser
    });
});

// =====================================================
// PUT METHOD
// =====================================================

// PUT - Replace an existing user
app.put("/users/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    users[index] = {
        id: id,
        name: req.body.name,
        role: req.body.role
    };

    res.json({
        method: "PUT",
        operation: "Replace complete user",
        message: "User updated successfully",
        data: users[index]
    });
});

// =====================================================
// PATCH METHOD
// =====================================================

// PATCH - Partially update a user
app.patch("/users/:id", (req, res) => {

    const id = Number(req.params.id);

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    Object.assign(user, req.body);

    res.json({
        method: "PATCH",
        operation: "Partially update user",
        message: "User partially updated successfully",
        data: user
    });
});

// =====================================================
// DELETE METHOD
// =====================================================

// DELETE - Remove a user
app.delete("/users/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const deletedUser = users.splice(index, 1);

    res.json({
        method: "DELETE",
        operation: "Remove user",
        message: "User deleted successfully",
        data: deletedUser[0]
    });
});

// =====================================================
// QUERY PARAMETER
// =====================================================

// Example:
// /search?role=student
app.get("/search", (req, res) => {

    const role = req.query.role;

    const result = users.filter(user => user.role === role);

    res.json({
        method: "GET",
        operation: "Search using query parameter",
        searchedRole: role,
        results: result
    });
});

// =====================================================
// 404 ROUTE
// =====================================================

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found",
        requestedURL: req.originalUrl
    });
});

// =====================================================
// START SERVER
// =====================================================

app.listen(PORT, () => {

    console.log("----------------------------------------");
    console.log("      EXPRESS.JS SEMINAR DEMO");
    console.log("----------------------------------------");

    console.log(`Server running at: http://localhost:${PORT}`);
    console.log(`Environment: ${ENVIRONMENT}`);

    console.log("\nAvailable Routes:");
    console.log("GET     /");
    console.log("GET     /users");
    console.log("GET     /users/:id");
    console.log("POST    /users");
    console.log("PUT     /users/:id");
    console.log("PATCH   /users/:id");
    console.log("DELETE  /users/:id");
    console.log("GET     /search?role=student");

    console.log("----------------------------------------");
});