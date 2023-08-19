import React, { PureComponent } from 'react';
import axios from 'axios';
import API_KEY from '../../config';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Avatar } from '@mui/material';

interface Atleta {
    atleta_id: number;
    nome_popular: string;
    posicao: {
        sigla: string;
    };
}

interface Time {
    nome_popular: string;
    escudo: string;
}

interface Artilheiro {
    atleta: Atleta;
    time: Time;
    gols: number;
}

interface ArtilhariaProps {
    campeonatoId: string;
}

interface ArtilhariaState {
    artilheiros: Artilheiro[];
}

class Artilharia extends PureComponent<ArtilhariaProps, ArtilhariaState> {
    constructor(props: ArtilhariaProps) {
        super(props);

        this.state = {
            artilheiros: [],
        };
    }

    fetchArtilharia = async () => {
        try {
            const response = await axios.get(`https://api.api-futebol.com.br/v1/campeonatos/${this.props.campeonatoId}/artilharia`, {
                headers: {
                    Authorization: 'Bearer ' + API_KEY,
                },
            });
            this.setState({ artilheiros: response.data });
        } catch (error) {
            console.error('Error fetching artilharia:', error);
        }
    };

    componentDidMount() {
        this.fetchArtilharia();
    }

    render() {
        const { artilheiros } = this.state;

        return (
            <div className="artilharia">
                <h2>Artilharia</h2>
                <TableContainer className="bg-zinc-800" component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className="text-slate-200 border-b border-slate-500 " >Posição</TableCell>
                                <TableCell className="text-slate-200 border-b border-slate-500" >Atleta</TableCell>
                                <TableCell className="text-slate-200 border-b border-slate-500" >Gols</TableCell>
                                <TableCell className="text-slate-200 border-b border-slate-500" >Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {artilheiros.map((artilheiro) => (
                                <TableRow key={artilheiro.atleta.atleta_id}>
                                    <TableCell className="text-slate-200 border-b border-slate-500" >{artilheiro.atleta.posicao?.sigla || 'Indefinido'}</TableCell>
                                    <TableCell className="text-slate-200 border-b border-slate-500" >{artilheiro.atleta.nome_popular}</TableCell>
                                    <TableCell className="text-slate-200 border-b border-slate-500" >{artilheiro.gols}</TableCell>
                                    <TableCell className="text-slate-200 border-b border-slate-500" >
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Avatar src={artilheiro.time.escudo} alt={artilheiro.time.nome_popular} /> {artilheiro.time.nome_popular}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default Artilharia;
