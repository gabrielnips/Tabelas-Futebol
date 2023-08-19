import React, { PureComponent } from 'react';
import axios from 'axios';
import API_KEY from '../../config';
import { Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Time {
    time_id: number;
    nome_popular: string;
    sigla: string;
    escudo: string;
}

interface Campeonato {
    posicao: number;
    time: Time;
    pontos: number;
    jogos: number;
    vitorias: number;
    empates: number;
    derrotas: number;
    gols_pro: number;
    gols_contra: number;
    saldo_gols: number;
    aproveitamento: string;
    ultimos_jogos: string[];
}

interface TabelaProps {
    campeonatoId: string;
}

interface TabelaState {
    data: Campeonato[];
}

class Tabela extends PureComponent<TabelaProps, TabelaState> {
    constructor(props: TabelaProps) {
        super(props);

        this.state = {
            data: [],
        };
    }

    fetchData = async () => {
        try {
            const response = await axios.get(`https://api.api-futebol.com.br/v1/campeonatos/${this.props.campeonatoId}/tabela`, {
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

    renderResultCircles = (results: string[]) => {
        return (
            <div style={{ display: 'flex' }}>
                {results.map((result, index) => (
                    <div
                        key={index}
                        style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: result === 'v' ? 'green' : result === 'e' ? 'orange' : 'red',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: '4px',
                            color: 'white',
                            fontSize: '10px',
                            fontWeight: 'bold',
                        }}
                    >
                        {result.toUpperCase()}
                    </div>
                ))}
            </div>
        );
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
                        <TableRow >
                            <TableCell className="text-slate-200 border-b border-slate-500" align="center">Posição</TableCell>
                            <TableCell className="text-slate-200 border-b border-slate-500">Time</TableCell>
                            <TableCell className="text-slate-200 border-b border-slate-500" align="center">Pontos</TableCell>
                            <TableCell className="text-slate-200 border-b border-slate-500" align="center">Jogos</TableCell>
                            <TableCell className="text-slate-200 border-b border-slate-500" align="center">Vitórias</TableCell>
                            <TableCell className="text-slate-200 border-b border-slate-500" align="center">Empates</TableCell>
                            <TableCell className="text-slate-200 border-b border-slate-500" align="center">Derrotas</TableCell>
                            <TableCell className="text-slate-200 border-b border-slate-500" align="center">Gols</TableCell>
                            <TableCell className="text-slate-200 border-b border-slate-500" align="center">Gols Sofridos</TableCell>
                            <TableCell className="text-slate-200 border-b border-slate-500" align="center">Saldo de Gols</TableCell>
                            <TableCell className="text-slate-200 border-b border-slate-500" align="center">Aproveitamento</TableCell>
                            <TableCell className="text-slate-200 border-b border-slate-500" align="center">Últimos Jogos</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.posicao}>
                                <TableCell className="text-slate-200 border-b border-slate-500" align="center">{row.posicao}</TableCell>
                                <TableCell className="text-slate-200 border-b border-slate-500">
                                    <Avatar alt={row.time.nome_popular} src={row.time.escudo} /> {row.time.nome_popular}
                                </TableCell>
                                <TableCell className="text-slate-200 border-b border-slate-500" align="center">{row.pontos}</TableCell>
                                <TableCell className="text-slate-200 border-b border-slate-500" align="center">{row.jogos}</TableCell>
                                <TableCell className="text-slate-200 border-b border-slate-500" align="center">{row.vitorias}</TableCell>
                                <TableCell className="text-slate-200 border-b border-slate-500" align="center">{row.empates}</TableCell>
                                <TableCell className="text-slate-200 border-b border-slate-500" align="center">{row.derrotas}</TableCell>
                                <TableCell className="text-slate-200 border-b border-slate-500" align="center">{row.gols_pro}</TableCell>
                                <TableCell className="text-slate-200 border-b border-slate-500" align="center">{row.gols_contra}</TableCell>
                                <TableCell className="text-slate-200 border-b border-slate-500" align="center">{row.saldo_gols}</TableCell>
                                <TableCell className="text-slate-200 border-b border-slate-500" align="center">{row.aproveitamento}%</TableCell>
                                <TableCell className="text-slate-200 border-b border-slate-500" align="center">{this.renderResultCircles(row.ultimos_jogos)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default Tabela;
