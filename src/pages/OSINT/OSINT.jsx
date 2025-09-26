import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import InputForm from '../../components/InputForm';
import ResultTable from '../../components/ResultTable';
import AlertBox from '../../components/AlertBox';

export default function OSINT() {
    const [query, setQuery] = useState('');
    const [resultados, setResultados] = useState([]);
    const [mensagem, setMensagem] = useState('');

    const buscarOSINT = async () => {
        if (!query) {
            setMensagem('Preencha o campo antes de buscar.');
            return;
        }

        try {
            const res = await fetch(`http://localhost:3000/api/osint?query=${query}`);
            const data = await res.json();
            setResultados(data);
            setMensagem('');
        } catch (err) {
            setMensagem('Erro ao buscar dados OSINT.');
        }
    };

    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ padding: '20px', flex: 1 }}>
                    <h2>OSINT – Inteligência Aberta</h2>
                    <InputForm label="Nome, usuário ou domínio" value={query} onChange={e => setQuery(e.target.value)} />
                    <button onClick={buscarOSINT}>Buscar</button>
                    {mensagem && <AlertBox mensagem={mensagem} tipo="erro" />}
                    {resultados.length > 0 && <ResultTable dados={resultados} />}
                </div>
            </div>
        </div>
    );
}