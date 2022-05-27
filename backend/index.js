const express = require("express");
const cors = require('cors');
const app = new express();
const pool = require("./db");

app.use(cors({
    origin: "*"
}));
app.use(express.json());

app.post("/studentdetail", async (req, res) => {
    try {
        const body = req.body;
        const result = await pool.query("INSERT INTO studentdetail(usn,firstname,lastname,address,mobilenumber,age) VALUES($1,$2,$3,$4,$5,$6) RETURNING *", [body.usn, body.firstName, body.lastName, body.address, body.mobileNumber, body.age]);
        console.log(result);
        res.status(201).json({
            status: "Student Details Inserted Successfully",
            data: {
                studentdetail: result.rows
            }
        });
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/studentdetail/getall", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM studentdetail");
        console.log(result);
        res.status(200).json({
            status: "Student Details Fetched Successfully",
            data: result.rows
        })
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/studentdetail/:usn", async (req, res) => {
    try {
        console.log(req.body);
        const { usn } = req.params;
        const { firstName, lastName, address, mobileNumber, age } = req.body;
        const result = await pool.query("UPDATE studentdetail SET firstname = $1, lastname = $2, address = $3, mobilenumber = $4, age = $5 WHERE usn = $6 RETURNING *", [firstName, lastName, address, mobileNumber, age, usn]);
        console.log(result);
        res.status(202).json("Student Details Updated Successfully");
    } catch (err) {
        console.error(err.message);
    }
});

app.delete("/studentdetail/:usn", async (req, res) => {
    try {
        // console.log(req)
        const { usn } = req.params;
        console.log(usn)
        const result = await pool.query("DELETE FROM studentdetail WHERE usn = $1", [usn]);
        console.log(result);
        res.status(200).json("Student Details Deleted succesfully");
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(5000, () => console.log("The server is up and listening on port 5000.. and nodemon is working good.."));