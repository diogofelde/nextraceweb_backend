import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import InputForm from '../../components/InputForm';
import ResultTable from '../../components/ResultTable';
import AlertBox from '../../components/AlertBox';

export default function RedTeam() {
    const [dominio, setDominio] = useState('');
    const [resultados, setResultados] = useState([]);
    const [mensagem, setMensagem] = useState('');

    const executarRecon = async () => {
        if (!dominio) {
            setMensagem('Informe um domínio para executar ReconNG.');
            return;
        }

        try {
            const res = await fetch(`http://localhost:3000/api/reconng?dominio=${dominio}`);
            const data = await res.json();
            setResultados(data);
            setMensagem('');
        } catch (err) {
            setMensagem('Erro ao executar ReconNG.');
        }
    };

    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ padding: '20px', flex: 1 }}>
                    <h2>Red Team – ReconNG</h2>
                    <InputForm label="Domínio alvo" value={dominio} onChange={e => setDominio(e.target.value)} />
                    <button onClick={executarRecon}>Executar</button>
                    {mensagem && <AlertBox mensagem={mensagem} tipo="erro" />}
                    {resultados.length > 0 && <ResultTable dados={resultados} />}
                </div>
            </div>
        </div>
    );
}