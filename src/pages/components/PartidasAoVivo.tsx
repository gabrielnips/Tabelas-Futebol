import React from 'react';
import axios from 'axios';
import API_KEY from '../../config';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface PartidaAoVivo {
    partida_id: number;
    time_mandante: {
        nome_popular: string;
        escudo: string;
    };
    time_visitante: {
        nome_popular: string;
        escudo: string;
    };
    placar: string;
    status: string;
    data_realizacao: string;
    hora_realizacao: string;
    estadio: {
        nome_popular: string;
    };
}

interface Props {

}

interface State {
    data: PartidaAoVivo[];
}


class PartidasAoVivo extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            data: [],
        };
    }
    primeiraLetraMaiuscula = (texto: string) => {
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    };

    fetchData = async () => {
        try {
            const response = await axios.get(`https://api.api-futebol.com.br/v1/ao-vivo`, {
                headers: {
                    Authorization: 'Bearer ' + API_KEY,
                },
            });

            this.setState({ data: response.data });
            console.log('[API] Tabela Carrega com Sucesso');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    componentDidMount() {
        this.fetchData();
    }
    render() {
        const { data } = this.state;
        return (
            <TableContainer className="bg-zinc-800" component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className="text-slate-200 border-b border-slate-500" >Partida</TableCell>
                            <TableCell className="text-slate-200 border-b border-slate-500" >Status</TableCell>
                            <TableCell className="text-slate-200 border-b border-slate-500" >Data</TableCell>
                            <TableCell className="text-slate-200 border-b border-slate-500" >Hora</TableCell>
                            <TableCell className="text-slate-200 border-b border-slate-500" >Estádio</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {data.map((partida) => (
                            <TableRow key={partida.partida_id}>
                                <TableCell className="text-slate-200 border-b border-slate-500" >
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <img src={partida.time_mandante.escudo} style={{ width: '40px', height: '40px' }} alt={partida.time_mandante.nome_popular} loading="lazy" />
                                        <span style={{ margin: '0 10px' }}>{partida.placar}</span>
                                        <img src={partida.time_visitante.escudo} style={{ width: '40px', height: '40px' }} alt={partida.time_visitante.nome_popular} loading="lazy" />
                                    </div>
                                </TableCell>
                                <TableCell className="text-slate-200 border-b border-slate-500" >{this.primeiraLetraMaiuscula(partida.status)}</TableCell>
                                <TableCell className="text-slate-200 border-b border-slate-500" >{partida.data_realizacao}</TableCell>
                                <TableCell className="text-slate-200 border-b border-slate-500" >{partida.hora_realizacao}</TableCell>
                                <TableCell className="text-slate-200 border-b border-slate-500" >{partida.estadio.nome_popular}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default PartidasAoVivo;
