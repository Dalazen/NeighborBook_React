import React, { useState, useLayoutEffect } from 'react'
import {
    Grid,
    Paper,
}
    from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Firebase from '../../services/FirebaseConnect'

export default function LivroEmprestimo() {

    const [lista, setLista] = useState([])

    useLayoutEffect(() => {

        Firebase
            .database()
            .ref(`/nomes`)
            .on('value', snapchot => {
                // converter objetos em listas
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
                                <TableCell align="left">Nome do Livro</TableCell>
                                <TableCell align="left">Autor(a)</TableCell>
                                <TableCell align="center">Editora</TableCell>
                                <TableCell align="center">Volume</TableCell>
                                <TableCell align="center">Dono</TableCell>
                                <TableCell align="center">Contato</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lista.map((item, key) => {
                                return <TableRow key={key}>
                                    <TableCell align="left">{item.nome}</TableCell>
                                    <TableCell align="left">{item.autor}</TableCell>
                                    <TableCell align="center">{item.editora}</TableCell>
                                    <TableCell align="center">{item.volume}</TableCell>
                                    <TableCell align="center">{item.owner}</TableCell>
                                    <TableCell align="center">{item.contact}</TableCell>
                                </TableRow>
                            }
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

        </Grid>
    )
}