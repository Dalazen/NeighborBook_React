import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import {
    Button,
    Grid,
    TextField,
}
    from '@material-ui/core';
import Firebase from '../services/FirebaseConnect'
import { v4 as uuidv4 } from 'uuid';

export default function RecadoRegistro(props) {
    let history = useHistory();

    const [recado, setRecado] = useState("")
    const [autor, setAutor] = useState("")
    const [email, setEmail] = useState("")
    const [assunto, setAssunto] = useState("")

    const limpar = () => {
        setRecado("")
        setAutor("")
        setEmail("")
        setAssunto("")
    }

    const salvarRegistro = () => {

        let objeto = {
            recado: recado,
            autor: autor,
            email: email,
            assunto: assunto,
        }
        let code = uuidv4()

        Firebase
            .database()
            .ref(`recados/${code}`)
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
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    label="Autor(a)"
                    variant="outlined"
                    size="small"
                    type="email"
                    style={{ width: "100%", marginBottom: 10 }} />
                <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label="Seu email"
                    variant="outlined"
                    size="small"
                    type="email"
                    style={{ width: "100%", marginBottom: 10 }} />
                <TextField
                    label="Assunto da sua mensagem"
                    variant="outlined"
                    value={assunto}
                    onChange={(e) => setAssunto(e.target.value)}
                    size="small"
                    type="email"
                    style={{ width: "100%", marginBottom: 10 }} />
                <TextField
                    label="Sua mensagem"
                    variant="outlined"
                    value={recado}
                    onChange={(e) => setRecado(e.target.value)}
                    size="small"
                    type="email"
                    style={{ width: "100%", marginBottom: 10 }} />

                <Button
                    variant="outlined"
                    color="primary"
                    onClick={salvarRegistro}
                    style={{ float: "right" }}>
                    Enviar recado
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => history.push('/menu')}
                    style={{ float: "right" }}>
                    Cancelar
                </Button>
            </Grid>
        </Grid >
    )
}