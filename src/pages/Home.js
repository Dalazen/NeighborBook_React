import React, { useState } from 'react'

import {
    Grid,
    Paper,
    MenuList,
    MenuItem
}
    from '@material-ui/core';
import Login from 'Login'
import RecadosRegistro from 'RecadosRegistro'
import Contato from './screen/Contato'

function MenuInicio() {

    const [screen, setScreen] = useState(0)

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item sm={10} xs={12}>

                </Grid>
                <Grid item sm={2} xs={12}>
                    <Grid item sm={12} xs={12}>
                        <Paper>
                            <MenuList>
                                <MenuItem onClick={() => setScreen(1)}>Login</MenuItem>
                                <MenuItem onClick={() => setScreen(2)}>Recados</MenuItem>
                                <MenuItem onClick={() => setScreen(3)}>Contato</MenuItem>
                            </MenuList>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item sm={10} xs={12}>
                    <Paper elevation={3}>
                        {screen === 0 &&
                            <> 
                            <br/>⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀Bem Vindo!!<br/>
                            <br/>⠀⠀⠀⠀⠀⠀⠀⠀Este site é destinado a todos que queiram cadastrar e/ou requerir empréstimo dos livros já cadastrados, como uma biblioteca entre amigos!<br/>
                            <br/>⠀⠀⠀⠀⠀⠀⠀⠀Para prosseguir, selecione uma opção no Menu ao lado. <br/>
                            <br/> ⠀⠀⠀⠀⠀⠀⠀⠀← ← ← ← ← ← ⠀ ← ← ← ← ← ← ⠀ ← ← ← ← ← ← <br/>
                            <br/><br/>
                            </> }
                        {screen === 1 &&
                            <Login setScreen={setScreen} /> }
                        {screen === 2 &&
                            <RecadosRegistro setScreen={setScreen} /> }
                        {screen === 3 &&
                            <Contato setScreen={setScreen} /> }

                    </Paper>
                </Grid>

            </Grid>
        </div> )
}

export default MenuInicio;
