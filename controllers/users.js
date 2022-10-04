/*import { v4 as uuidv4 } from 'uuid';


let users = [ ]

export const getUsers = (req, res) => {
    res.send(users);
}

export const createUser = (req, res) => {
    const user = req.body;

    users.push({ ...user, id: uuidv4() });

    res.send(`User with the name ${user.firstName} added to the database!`);
}

export const getUser = (req, res) => {
    const {id} = (req.params);

 const foundUser = users.find((user) => user.id = id);

    res.send(foundUser);
}

export const deleteUser = (req, res) => {
const { id } = req.params;

users = users.filter((user) => user.id != id);

res.send(`User with the id ${id} deleted from the database.`);
}

export const updateUser = (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;

    const user = users.find((user) => user.id = id);

    if(firstName) user.firstName = firstName;
    if(lastName) user.lastName = lastName;
    if(age) user.age = age;

    res.send(`User with the id ${id} has been updated`);
}*/


import sqlite3 from "sqlite3";
sqlite3.verbose()
const db = new sqlite3.Database('data.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.log(err);
})
let sql
sql = "CREATE TABLE IF NOT EXISTS data(id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, age INTEGER)"
db.run(sql)
export const getUsers = (req, res) => {
    db.all("SELECT * FROM data", (err, rows) => {
        res.send(rows);
    })

}

export const createUser = (req, res) => {
    const user = req.body;
    sql = "INSERT INTO data (firstName, lastName , age) VALUES(?,?,?)"
    db.run(sql, user["firstName"], user["lastName"], user["age"])
    res.send("created");
}

export const deleteUser = (req, res) => {
    const id = req.params.id;
    sql = "DELETE FROM data WHERE id = ?"
    db.run(sql, id)

    res.send(`User with the id ${id} deleted from the database.`);
}
export const updateUser = (req, res) => {
    const id = req.params.id;
    const user = req.body;
    sql = `UPDATE data SET firstName = ?, lastName = ?, age = ? WHERE id = ${id}`
    db.run(sql, user["firstName"], user["lastName"], user["age"])
    res.send(`User with the id ${id} has been updated`);

}
    





