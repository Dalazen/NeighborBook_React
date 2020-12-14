import React, { useState } from 'react'

import {
    Button,
    Grid,
    Paper,
    MenuItem,
    Menu,
    MenuList,
}
    from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { useHistory } from "react-router-dom"
import Firebase from '../services/FirebaseConnect'
import BookRegistro from './screen/BookRegistro'
import BookLista from './screen/BookLista'
import BookEmprestimo from './screen/BookEmprestimo'
import Recados from './screen/Recados'

export default function Menus() {
    let history = useHistory();

    const [screen, setScreen] = useState(0)
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                        <MenuList>
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            Abrir Menu
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}>
                                <MenuItem onClick={() => setScreen(0)&&handleClose}>Home</MenuItem>
                                <MenuItem onClick={() => setScreen(1)&&handleClose}>Acervo de livros</MenuItem>
                                <MenuItem onClick={() => setScreen(2)&&handleClose}>Registrar seu livro</MenuItem>
                                <MenuItem onClick={() => setScreen(3)&&handleClose}>Emprestimos</MenuItem>
                                <MenuItem onClick={() => setScreen(4)&&handleClose}>Recados</MenuItem>
                            </Menu>
                        </MenuList>
                    </Grid>
                </Grid>
                <Grid item sm={10} xs={12}>
                    <Paper elevation={3}>
                        {screen === 0 &&
                            <> 
                            <br/>⠀Bem Vindo!!<br/>
                            <br/>Este site tem por objetivo criar uma biblioteca comunitária,
                            permitindo aos usuários cadastrar seus livros e requerir empréstimos dos
                            livros já cadastrados, entretanto como o objetivo do mesmo é criar um "laço"
                            entre os usuários, qualquer usuário pode adicionar ou remover os livros cadastrados
                            então use esta função com cuidado!!<br/>
                            <br/>⠀Qualquer usuário que publicar conteúdo ofensivo será banido imediamente!<br/>
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
                </Grid>

            </Grid>
        </div>
    )
}
