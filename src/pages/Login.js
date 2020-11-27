import React, { useState, useLayoutEffect } from 'react'

import {
    Button,
    Grid,
    Paper,
    TextField,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
}
    from '@material-ui/core';

import Firebase from '../services/FirebaseConnect'
import { useHistory } from "react-router-dom"

function Login() {
    let history = useHistory();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [msg, setMsg] = useState("")
    const [msg2, setMsg2] = useState("")
    const [lembreme, setLembreme] = useState(false)
    const [erecado] = useState(true)
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false); };

    useLayoutEffect(() => {

        let emailStorage = localStorage.getItem("email")
        let passwordStorage = localStorage.getItem("password")
        if (emailStorage && passwordStorage) {
            setEmail(emailStorage)
            setPassword(passwordStorage)
            setLembreme(true)
        }
    }, [])

    const registra = () => {
        if (erecado === true) {
            history.push("/recado")
        }
    }

    const cadastro = () => {
        if (lembreme === false) {
            localStorage.removeItem("email")
            localStorage.removeItem("password")
        }

        Firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((retorno) => {
                if (lembreme === true) {
                    localStorage.setItem("email", email)
                    localStorage.setItem("password", password)
                }
                setMsg2("Usuário criado!")
                setTimeout(() => {
                    history.push("/menu");
                }, 500);

            })
            .catch((erro) => {
                if (password.length < 5) {
                    console.log(erro)
                    setMsg2("")
                    setMsg("Senha muito curta! Mínimo 6 dígitos...")
                }
                else {
                    setMsg("Email inválido!")
                }
                setTimeout(() => {
                    setMsg("")
                }, 1000);
            })
    }
    const login = () => {

        if (lembreme === false) {
            localStorage.removeItem("email")
            localStorage.removeItem("password")
        }

        Firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((retorno) => {
                sessionStorage.setItem("uuid", retorno.user.uid)
                if (lembreme === true) {
                    localStorage.setItem("email", email)
                    localStorage.setItem("password", password)
                }
                setMsg("")
                setMsg2("")
                setTimeout(() => {
                    history.push("/menu");
                }, 100);

            })
            .catch((erro) => {
                console.log(erro)
                setMsg2("")
                setMsg("Usuário ou senha inválidos!")
            })
    }
    return (
        <div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Seja bem vindo ao site neighborbook.com!!"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Aqui você pode cadastrar seus livros para empréstimo, assim como
                pedir empréstimos para seus "vizinhos", para cadastrar seus livros
                ou requerir empréstimos você deve efetuar seu cadastro :)
                <br/>Também é possível deixar um feedback ou recado clicando no botão "CONTATO".
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Prosseguir para o Login
                </Button>
            </DialogActions>
            </Dialog>

            <Grid container spacing={1}>
                <Grid item sm={8} xs={12}>

                </Grid>
                <Grid item sm={4} xs={12}>
                    <Paper elevation={0}>
                        <TextField
                            label="E-mail"
                            variant="outlined"
                            size="small"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: "100%", marginBottom: 10 }} />
                        <TextField
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Senha"
                            variant="outlined"
                            type="password"
                            size="small"
                            style={{ width: "100%", marginBottom: 10 }} />
                        <Grid item sm={12} xs={12} style={{ textAlign: "left" }}>
                            <Checkbox
                                checked={lembreme}
                                onChange={(e) => setLembreme(e.target.checked)}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            /> Lembre-me </Grid>
                        <Grid item sm={12} xs={12} style={{ textAlign: "center", color: "red", marginBottom: 5, fontSize: 16 }}>
                            {msg} </Grid>
                        <Grid item sm={12} xs={12} style={{ textAlign: "center", color: "green", marginBottom: 5, fontSize: 16 }}>
                            {msg2} </Grid>
                        <Button
                            onClick={login}
                            size="large"
                            variant="contained"
                            color="primary"
                            style={{ float: "left" }}>
                            Entrar
                        </Button>
                        <Button
                            onClick={cadastro}
                            size="large"
                            variant="contained"
                            color="primary"
                            style={{ float: "right" }}>
                            Cadastre-se
                        </Button>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <Button
                            onClick={registra}
                            size="large"
                            variant="contained"
                            color="secondary"
                            style={{float: "right"}} >
                            Contato
                        </Button>
                    </Paper>
                </Grid>

            </Grid>
        </div>
    );
}

export default Login;
