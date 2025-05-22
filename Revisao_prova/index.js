const express = require('express');
const mysql = require('mysql2');


const app = express();

app.use(express.json());

const conexao = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    passaword: '',
    database: 'consultorio_medico',    
})

app.use(express.json())

app.post('/consultas', (req, res) => {
    const consulta = {
        paciente: req.body.paciente,
        medico: req.body.medico,
        especialidade: req.body.especialidade,
        data : req.body. data ,
        horario: req.body.horario,
        observacoes: req.body.observacoes

    }

    if (!consulta.paciente || typeof consulta.paciente != 'string' || consulta.paciente.trim() == '') {
        return res.status(400).send('Nome do paciente é obrigatório e deve ser uma string não vazia.');
    }

    if (!consulta.medico || typeof consulta.medico != 'string' || consulta.medico.trim() == '') {
        return res.status(400).send('Nome do medico é obrigatório e deve ser uma string não vazia.');
    }

    if (!consulta.especialidade || typeof consulta.especialidade != 'string' || consulta.especialidade.trim() == '') {
        return res.status(400).send('Epecialidade do medico é obrigatório e deve ser uma string não vazia.');
    }
    
    if (!consulta.data|| consulta.data.trim() == '') {
        return res.status(400).send('Data deve ser um número inteiro.');
    }

    if (consulta.horario == undefined || consulta.data.trim() == '') {
        return res.status(400).send('horario deve ser um número inteiro.');
    }
    
    conexao.query(
        'INSERT INTO consultas(paciente, medico, especialidade, data, horario, observacoes) VALUES (?, ?, ?, ?, ?, ?)',
        [consulta.paciente, consulta.medico, consulta.especialidade, consulta.data, consulta.horario, consulta.observacoes],
        () => {
            res.status(201).send('Consulta agendada com sucesso!')
        }
    );


})

app.get('/consultas', (req, res) => {
    conexao.query('SELECT paciente, medico, especialidade, data, horario, observacoes FROM consultas', (err, results) => {
        if(err) {
            return res.status(500).send('Erro ao buscar colsulta')
        }
        res.status(200).send(results);
    })
})

app.listen(3000, () => {
    console.log("Servidor backend rodando em http://localhost:3000")
})