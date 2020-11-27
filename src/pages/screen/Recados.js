import React, { useState, useLayoutEffect } from 'react'
import { useHistory } from "react-router-dom";
import {
    Button,
    Grid,
    Paper,
}
    from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Firebase from '../../services/FirebaseConnect'

export default function LivroLista(props) {
    let history = useHistory();

    const [lista, setLista] = useState([])

    useLayoutEffect(() => {

        Firebase
            .database()
            .ref(`/recados`)
            .on('value', snapchot => {
                if (snapchot.val()) {
                    let dados = snapchot.val()
                    const keys = Object.keys(dados)
                    const lista = keys.map((key) => {
                        return { ...dados[key], id: key }
                    })
                    setLista(lista)
                } else{
                    setLista([])
                }
            })
    }, [])

    return (
        <Grid container spacing={1} >
            <Grid item sm={12} xs={12}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Assunto</TableCell>
                                <TableCell align="center">Mensagem</TableCell>
                                <TableCell align="left">Autor(a)</TableCell>
                                <TableCell align="center">Email</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lista.map((item, key) => {
                                return <TableRow key={key}>
                                    <TableCell align="left">{item.assunto}</TableCell>
                                    <TableCell align="center">{item.recado}</TableCell>
                                    <TableCell align="left">{item.autor}</TableCell>
                                    <TableCell align="center">{item.email}</TableCell>
                                </TableRow>
                            }
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item sm={12} xs={12}>
                <Button
                    variant="contained"
                    onClick={() => history.push('/registrorecado')}
                    color="primary"
                    startIcon={<AddCircleIcon />}>
                    Novo Recado
                    </Button>
            </Grid>

        </Grid>
    )
}