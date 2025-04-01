const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/process-marks", (req, res) => {
    let students = [];

    for (let i = 1; i <= 5; i++) {
        let rollNo = req.body[`roll${i}`];
        let name = req.body[`name${i}`];
        let marks = [];

        for (let j = 1; j <= 5; j++) {
            marks.push(parseInt(req.body[`marks${i}_${j}`], 10));
        }

        let totalMarks = marks.reduce((a, b) => a + b, 0);
        let percentage = (totalMarks / 500) * 100;
        let status = percentage >= 50 ? "Pass" : "Fail";

        students.push({ rollNo, name, marks, totalMarks, percentage, status });
    }

    students.sort((a, b) => b.totalMarks - a.totalMarks);
    students[0].rank = "1st Position";
    students[1].rank = "2nd Position";

    let resultPage = "<h2>Marksheet</h2><table border='1'><tr><th>Roll No</th><th>Name</th><th>Subjects</th><th>Total</th><th>Percentage</th><th>Status</th><th>Rank</th></tr>";
    students.forEach((s) => {
        resultPage += `<tr><td>${s.rollNo}</td><td>${s.name}</td><td>${s.marks.join(", ")}</td><td>${s.totalMarks}</td><td>${s.percentage.toFixed(2)}%</td><td>${s.status}</td><td>${s.rank || ""}</td></tr>`;
    });
    resultPage += "</table>";

    res.send(resultPage);
});

app.listen(3000, () => console.log("Server running on port 3000"));
