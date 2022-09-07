import express from 'express';
import mysql from 'mysql';
import faker from 'faker';

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database:'nodedb'
};

const port = 3333;
const app = express();

const insertRow = (connection) => new Promise((resolve) => {
  const sql = `INSERT INTO people(name) values('${faker.name.findName()}');`
  connection.query(sql, (error, result) => {
    resolve(result);
  });
});

const getPeople = (connection) => new Promise((resolve) =>{
  connection.query('SELECT * FROM people;', (error, result) => {
    resolve(result);
  });
})

app.get("/", async (req, res) => {
  const connection = mysql.createConnection(config);
  await insertRow(connection);

  const results = await getPeople(connection);

  await connection.end();

  const listName = results.map(result => {
    return `<li>${result.name}</li>`;
  })

  res.send(`
    <div>
        <h1>Full Cycle Rocks!</h1>

        <p>
            - Lista de nomes cadastradas no banco.
        </p>
        <ol>
            ${listName.join("\n")}
        </ol>
    </div>
  `);
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
})
