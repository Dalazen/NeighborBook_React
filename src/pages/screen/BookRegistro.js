import React, { useState } from 'react'
import {
    Button,
    Grid,
    TextField,
}
    from '@material-ui/core';
import Firebase from '../../services/FirebaseConnect'
import { v4 as uuidv4 } from 'uuid';

export default function LivroRegistro(props) {

    const [nome, setNome] = useState("")
    const [autor, setAutor] = useState("")
    const [editora, seteditora] = useState("")
    const [volume, setvolume] = useState("")
    const [owner, setowner] = useState("")
    const [contact, setcontact] = useState("")

    const limpar = () => {
        setNome("")
        setAutor("")
        seteditora("")
        setvolume("")
        setowner("")
        setcontact("")
    }

    const salvarRegistro = () => {

        let objeto = {
            nome: nome,
            autor: autor,
            editora: editora,
            volume: volume,
            owner: owner,
            contact: contact
        }
        let code = uuidv4()

        Firebase
            .database()
            .ref(`nomes/${code}`)
            .set(objeto)
            .then(() => {
                limpar()
            })
            .catch((erro) => {
                console.log(erro)
            })
    }

    return (
        <Grid container spacing={1} >
            <Grid item sm={10} xs={12}>
                <TextField
                    label="Nome do livro"
                    variant="outlined"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    size="small"
                    type="text"
                    style={{ width: "100%", marginBottom: 10 }} />
                <TextField
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    label="Autor(a)"
                    variant="outlined"
                    size="small"
                    type="text"
                    style={{ width: "100%", marginBottom: 10 }} />
                <TextField
                    value={editora}
                    onChange={(e) => seteditora(e.target.value)}
                    label="Editora"
                    variant="outlined"
                    size="small"
                    type="text"
                    style={{ width: "100%", marginBottom: 10 }} />
                <TextField
                    value={volume}
                    onChange={(e) => setvolume(e.target.value)}
                    label="Volume"
                    variant="outlined"
                    size="small"
                    type="text"
                    style={{ width: "100%", marginBottom: 10 }} />
                <TextField
                    value={owner}
                    onChange={(e) => setowner(e.target.value)}
                    label="Seu nome"
                    variant="outlined"
                    size="small"
                    type="text"
                    style={{ width: "100%", marginBottom: 10 }} />
                <TextField
                    value={contact}
                    onChange={(e) => setcontact(e.target.value)}
                    label="Seu contato"
                    variant="outlined"
                    size="small"
                    type="text"
                    style={{ width: "100%", marginBottom: 10 }} />
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={salvarRegistro}
                    style={{ float: "right" }}>
                    Enviar Dados
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => props.setScreen(1)}
                    style={{ float: "right" }}>
                    Cancelar
                </Button>
            </Grid>
        </Grid >
    )
}
