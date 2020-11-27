import React, { useState } from 'react'

import {
    Button,
    Grid,
    Paper,
    MenuList,
    MenuItem
}
    from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { useHistory } from "react-router-dom"
import Firebase from '../services/FirebaseConnect'
import BookRegistro from './screen/BookRegistro'
import BookLista from './screen/BookLista'
import BookEmprestimo from './screen/BookEmprestimo'
import Recados from './screen/Recados'

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
                            </MenuList>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item sm={10} xs={12}>
                    <Paper elevation={3}>
                        {screen === 0 &&
                            <> 
                            <br/>⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀Bem Vindo!!<br/>
                            <br/>⠀Este site tem por objetivo criar uma biblioteca comunitária,
                            permitindo aos usuários cadastrar seus livros e requerir empréstimos dos
                            livros já cadastrados, entretanto como o objetivo do mesmo é criar um "laço"
                            entre os usuários, qualquer usuário pode adicionar ou remover os livros cadastrados
                            então use esta função com cuidado!!<br/>
                            <br/>⠀Para prosseguir, selecione uma opção no Menu ao lado. <br/>
                            <br/>← ← ← ← ← ← ⠀ ← ← ← ← ← ← ⠀ ← ← ← ← ← ← <br/>
                            <br/>⠀Qualquer usuário tóxico será banido imediamente!<br/>
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

                    </Paper>
                    <br/>
                    <br/>
                    <footer> 
                        Desenvolvido por Guilherme Dalazen
                        <br/>Email: guilhermebatistellad@gmail.com
                    </footer>
                </Grid>

            </Grid>
        </div>
    )
}
