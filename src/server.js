import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import {crearConfigBDD} from "./db.config.js";
import initModels from "./models/init-models.js";


const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'kevin',
  database: 'unijordimunoz'
});

const db2 = crearConfigBDD();
db2.sync().then(() => {
  console.log("Drop and re-sync db.")
});
const models = initModels(db2);


db.connect(err => {
  if (err) {
    console.log('Error: ', err)
  } else {
    console.log('Funciona')
  }
});

app.get('/llistaProfMunoz', (req, res) => {
  db.query('SELECT PROF_DNI,PROF_NOM, PROF_COGNOM_1, PROF_COGNOM_2, PROF_TELEFON FROM professor WHERE PROF_CATEGORIA = \'Associat\'', (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
})

app.post('/modifCorreuMunoz/:correu', (req, res) => {
  const email = req.params.correu;
  db.query('ALTER TABLE alumnes MODIFY ALUMN_E_MAIL VARCHAR(30) SET DEFAULT ?', [email], (err, result) => {
    if (err) {
      console.log("ja esta modificada, pelacanyes")
    } else {
      res.json(result)
    }
  })
})

app.get('/profeDOlotMunoz', (req, res) => {
  try {
    const data = models.professor.findAll({
      attributes: ['PROF_DNI', 'PROF_NOM', 'PROF_COGNOM_1', 'PROF_COGNOM_2']
    });
    res.json(data)
  } catch (error) {
    console.error("Error en el get /productos")
    console.error(error)
    res.status(500).json({
      mensaje: "Error obteniendo los productos",
      error: error.message
    })
  }
})
app.post('/nouDeptMunoz', (req, res) => {
  try {
    const linea = models.departament.create(req.body)
    res.status(201).json(linea)
  } catch (error) {
    console.error("No puc pelacanyes")
    console.error(error)
    res.status(500).json({
      mensaje: "Error afegint la linea",
      error: error.message
    });
  }
})


app.listen(3000, () => {
  console.log('Servidor en marxa');
});


