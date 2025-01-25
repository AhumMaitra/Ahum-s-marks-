const students = {
    "18": {
        name: "Ahum Maitra",
        classes: {
            "Class 6": {
                terms: {
                    "1st": {
                        "Bengali": { marks_obtained: 11, out_of: 15 },
                        "English": { marks_obtained: 13, out_of: 15 },
                        "Math": { marks_obtained: 1, out_of: 15 },
                        "Science": { marks_obtained: 6, out_of: 15 },
                        "History": { marks_obtained: 14, out_of: 15 },
                        "Geography": { marks_obtained: 9, out_of: 15 },
                        "Health and Physical Education": { marks_obtained: 12, out_of: 15 }
                    },
                    "2nd": {
                        "Bengali": { marks_obtained: 17, out_of: 25 },
                        "English": { marks_obtained: 21, out_of: 25 },
                        "Math": { marks_obtained: 5, out_of: 25 },
                        "Science": { marks_obtained: 10, out_of: 25 },
                        "History": { marks_obtained: 24, out_of: 25 },
                        "Geography": { marks_obtained: 15, out_of: 25 },
                        "Health and Physical Education": { marks_obtained: 15, out_of: 15 }
                    },
                    "3rd": {
                        "Bengali": { marks_obtained: 47, out_of: 70 },
                        "English": { marks_obtained: 58, out_of:70 },
                        "Math": { marks_obtained: 48, out_of: 70 },
                        "Science": { marks_obtained: 43, out_of:70 },
                        "History": { marks_obtained: 50, out_of:70 },
                        "Geography": { marks_obtained: 60, out_of: 70 },
                        "Health and Physical Education": { marks_obtained: 25, out_of: 35 }
                    }
                }
                    }
                }
            }
        };

function showResults() {
    const rollNumber = document.getElementById("roll-number").value;
    const name = document.getElementById("name").value;
    const pin = document.getElementById("pin").value;
    const term = document.getElementById("term-select").value;
    const subject = document.getElementById("subject-select").value;
    const classSelected = document.getElementById("class-select").value;
    const resultsContainer = document.getElementById("results-container");

    if (!rollNumber || !name || !pin) {
        alert("Please enter roll number, name, and pin.");
        return;
    }

    if (pin !== "010222012") { // Example pin for authentication
        alert("Invalid pin.");
        return;
    }

    const student = students[rollNumber];

    if (!student || student.name.toLowerCase() !== name.toLowerCase()) {
        resultsContainer.innerHTML = "<p>No results found for this roll number or name.</p>";
        return;
    }

    resultsContainer.innerHTML = "";

    if (classSelected === "all") {
        for (const [className, classData] of Object.entries(student.classes)) {
            displayClassResults(className, classData, term, subject, resultsContainer);
        }
    } else {
        const classData = student.classes[classSelected];
        if (!classData) {
            resultsContainer.innerHTML = "<p>No results found for this class.</p>";
            return;
        }
        displayClassResults(classSelected, classData, term, subject, resultsContainer);
    }
}

function displayClassResults(className, classData, term, subject, resultsContainer) {
    if (term === "all") {
        for (const [termName, termData] of Object.entries(classData.terms)) {
            displayTermResults(className, termName, termData, subject, resultsContainer);
        }
    } else {
        const termData = classData.terms[term];
        if (!termData) {
            resultsContainer.innerHTML += `<p>No results found for ${className} in ${term} term.</p>`;
            return;
        }
        displayTermResults(className, term, termData, subject, resultsContainer);
    }
}

function displayTermResults(className, termName, termData, subject, resultsContainer) {
    resultsContainer.innerHTML += `<h2>${className} - ${termName} Term</h2>`;

    if (subject === "all") {
        let found = false;
        for (const [subjectName, marks] of Object.entries(termData)) {
            resultsContainer.innerHTML += createResultItem(subjectName, marks.marks_obtained, marks.out_of);
            found = true;
        }
        if (!found) {
            resultsContainer.innerHTML += "<p>No results found.</p>";
        }
    } else {
        const marks = termData[subject];
        if (marks) {
            resultsContainer.innerHTML += createResultItem(subject, marks.marks_obtained, marks.out_of);
        } else {
            resultsContainer.innerHTML += `<p>No data available for ${subject} in ${termName} term.</p>`;
        }
    }
}

function createResultItem(subject, marksObtained, outOf) {
    return `
        <div class="result-item">
            <span>${subject}</span>: ${marksObtained} out of ${outOf}
        </div>
    `;
}