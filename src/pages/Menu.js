import React, { useState } from 'react'

import {
    Button,
    Grid,
    Paper,
    MenuList,
    MenuItem
}
    from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from "react-router-dom";
import Firebase from '../services/FirebaseConnect'
import BookRegistro from './screen/BookRegistro'
import BookLista from './screen/BookLista'
import BookEmprestimo from './screen/BookEmprestimo'
import Recados from './screen/Recados'
import Contato from './screen/Contato'

export default function Menu() {
    let history = useHistory();

    const [screen, setScreen] = useState(0)

    const logoff = () => {
        sessionStorage.removeItem("uuid")
        Firebase
            .auth()
            .signOut()
            .then(() => {
                history.push("/");
            }).catch(() => {
                history.push("/");
            })
    }

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item sm={10} xs={12}>

                </Grid>
                <Grid item sm={2} xs={12}>
                    <Button
                        onClick={logoff}
                        variant="contained"
                        color="primary"
                        startIcon={<ExitToAppIcon />}>
                        Logoff
                    </Button>
                </Grid>
                <Grid item sm={2} xs={12}>
                    <Grid item sm={12} xs={12}>
                        <Paper>
                            <MenuList>
                                <MenuItem onClick={() => setScreen(0)}>Menu</MenuItem>
                                <MenuItem onClick={() => setScreen(1)}>Acervo de livros</MenuItem>
                                <MenuItem onClick={() => setScreen(2)}>Registrar seu livro</MenuItem>
                                <MenuItem onClick={() => setScreen(3)}>Emprestimos</MenuItem>
                                <MenuItem onClick={() => setScreen(4)}>Recados</MenuItem>
                                <MenuItem onClick={() => setScreen(5)}>Contato</MenuItem>
                            </MenuList>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item sm={10} xs={12}>
                    <Paper elevation={3}>
                        {screen === 0 &&
                            <> 
                            <br/>⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀Bem Vindo!!<br/>
                            <br/>⠀⠀⠀⠀⠀⠀⠀⠀Este site é destinado a todos que queiram cadastrar e/ou requerir empréstimo dos livros já cadastrados, como uma biblioteca entre "vizinhos"!<br/>
                            <br/>⠀⠀⠀⠀⠀⠀⠀⠀Para prosseguir, selecione uma opção no Menu ao lado. <br/>
                            <br/> ⠀⠀⠀⠀⠀⠀⠀⠀← ← ← ← ← ← ⠀ ← ← ← ← ← ← ⠀ ← ← ← ← ← ← <br/>
                            <br/><br/>
                            </> }
                        {screen === 1 &&
                            <BookLista setScreen={setScreen} /> }
                        {screen === 2 &&
                            <BookRegistro setScreen={setScreen} /> }
                        {screen === 3 &&
                            <BookEmprestimo setScreen={setScreen} /> }
                        {screen === 4 &&
                            <Recados setScreen={setScreen} /> }
                        {screen === 5 &&
                            <Contato setScreen={setScreen} /> }

                    </Paper>
                </Grid>

            </Grid>
        </div>
    )
}
