import React, { useEffect, useState, Suspense } from 'react';
import { Container, Select, MenuItem, Grid } from '@mui/material';
import axios from 'axios';
import API_KEY from './..//config';

const Tabela = React.lazy(() => import('./components/Tabela'));
const Artilharia = React.lazy(() => import('./components/Artilharia'));
const PartidasAoVivo = React.lazy(() => import('./components/PartidasAoVivo'));


interface Campeonato {
  campeonato_id: number;
  nome_popular: string;
}

const Index = () => {
  const [data, setData] = useState<Campeonato[]>([]);
  const [selectedCampeonato, setSelectedCampeonato] = useState('');
  const [partidasAoVivo, setPartidasAoVivo] = useState([]);

  const fetchData = async () => {
    try {
      const responseCampeonatos = await axios.get('https://api.api-futebol.com.br/v1/campeonatos', {
        headers: {
          Authorization: 'Bearer ' + API_KEY,
        },
      });
      setData(responseCampeonatos.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Container className="fixed top-0 left-0 right-0 bg-zinc-800 ring-2 ring-rose-400 ring-offset-4 ring-offset-slate-50 dark:ring-offset-slate-900" style={{ borderRadius: '10px', justifyContent: 'center', padding: '20px', marginTop: '20px', width: '220px' }}>
        <Select className="bg-zinc-700 text-slate-200 "
          value={selectedCampeonato}
          onChange={(event) => setSelectedCampeonato(event.target.value)}
        >
          <MenuItem value="" >
            Selecione um campeonato
          </MenuItem>
          {data.map((campeonato) => (
            <MenuItem key={campeonato.campeonato_id} value={campeonato.campeonato_id} >
              {campeonato.nome_popular}
            </MenuItem>
          ))}
        </Select>
      </Container>

      {selectedCampeonato !== '' && (
        <Suspense fallback={<div>Carregando...</div>}>


          <Grid style={{ padding: '20px' }} container spacing={1} className="grid">
            <Grid item xs={8} md={5.5} className="two">
              <Container className="bg-zinc-800 ring-2 ring-rose-400 ring-offset-4 ring-offset-slate-50 dark:ring-offset-slate-900" style={{ borderRadius: '10px', padding: '20px', marginTop: '20px' }}>
                <PartidasAoVivo />
              </Container>
            </Grid>
            <Grid item xs={8} md={5.5} className="three">
              <Container className="bg-zinc-800 ring-2 ring-rose-400 ring-offset-4 ring-offset-slate-50 dark:ring-offset-slate-900" style={{ borderRadius: '10px', padding: '20px', marginTop: '20px' }}>
                <Artilharia campeonatoId={selectedCampeonato} />
              </Container>
            </Grid>
            <Grid item xs={8} md={12} className="one">
              <Container className="bg-zinc-800 ring-2 ring-rose-400 ring-offset-4 ring-offset-slate-50 dark:ring-offset-slate-900" style={{ borderRadius: '10px', padding: '20px', marginTop: '20px' }}>
                <Tabela campeonatoId={selectedCampeonato} />
              </Container>
            </Grid>

          </Grid>
        </Suspense>
      )}
    </div>
  );
};

export default Index;
