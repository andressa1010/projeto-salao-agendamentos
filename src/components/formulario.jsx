import { useRef, useState } from "react";
import api from "../services/api"; 
import logoImg from "../assets/logo-salao.png";

function Formulario() {
  const inputCliente = useRef();

  const inputData = useRef();
  const [servicoSelecionado, setServicoSelecionado] = useState("");

  async function registerNewAppointment() {
    try {
      const formattedDate = new Date(inputData.current.value).toISOString();

      await api.post("/agendamentos", {
        cliente: inputCliente.current.value,
        servico: servicoSelecionado,
        data: formattedDate,
      });
    } catch (error) {
      console.error("Erro ao registrar agendamento:", error);
      alert("Ocorreu um erro ao registrar o agendamento. Tente novamente.");
    }
  }

  function alertRegistre(){
     alert("Agendamento registrando com sucesso!")
  }

  return (
    <div className="container">
      <img src={logoImg} />
      <h1 className="title">Seu Momento de Beleza Começa Aqui</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          registerNewAppointment();
        }}
      >
        <div className="form-group">
          <label>Cliente:</label>
          <input type="text" ref={inputCliente} required />
        </div>
        <div className="form-group">
          <label>Serviço:</label>
          <select
            value={servicoSelecionado}
            onChange={(e) => setServicoSelecionado(e.target.value)}
            required
          >
            <option value="" disabled>
              Selecione um serviço
            </option>
            <option value="Progressiva">Progressiva</option>
            <option value="Hidratação">Hidratação</option>
            <option value="Botox">Botox</option>
          </select>
        </div>
        <div className="form-group">
          <label>Data:</label>
          <input type="datetime-local" ref={inputData} required />
        </div>
        <button onClick={alertRegistre}  className="btn" type="submit">
        Agendar Agora
        </button>
      </form>
    </div>
  );
}

export default Formulario;
