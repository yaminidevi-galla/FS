let students = [];

function addStudent() {

    let input = document.getElementById("studentName");
    let name = input.value.trim();

    if (name === "") {
        alert("Please enter student name");
        return;
    }

    students.push(name);

    input.value = "";

    displayStudents();
}

function displayStudents() {

    let list = document.getElementById("studentList");
    let total = document.getElementById("totalStudents");

    list.innerHTML = "";

    students.forEach(function(student, index) {

        let li = document.createElement("li");

        li.innerHTML = student +
            '<button class="delete-btn" onclick="deleteStudent(' +
            index + ')">Delete</button>';

        list.appendChild(li);
    });

    total.textContent = students.length;
}

function deleteStudent(index) {

    students.splice(index, 1);

    displayStudents();
}