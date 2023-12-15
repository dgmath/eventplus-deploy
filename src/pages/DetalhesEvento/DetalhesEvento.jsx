import React, { useContext, useEffect, useState } from "react";
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Title/Title";
import api from "../../Services/Service";
import Table from "./TableComentario/TableComentario"
import { useLocation, useParams } from "react-router-dom";
import Container from "../../components/Container/Container";
import { dateFormatDbToView } from "../../Utils/stringFunctions";
import { UserContext } from "../../context/AuthContext";
import "./DetalhesEvento.css"

const DetalhesEvento = () => {
  const [comentario, setComentario] = useState([]);
  // const [evento, setEvento] = useState({});
  const { userData } = useContext(UserContext);

  const {state} = useLocation();

  const { idEvento } = useParams();
  useEffect(() => {
    async function getEventos() {
      if (userData.role === "Administrador") {
        try {
          const retornoComentario = await api.get(`/ComentariosEvento?id=${state.idEvento}`)
          // const retornoEvento = await api.get(`/Evento/${state.idEvento}`)
          // setEvento(retornoEvento.data)
          console.log("log do evento");
          // console.log(retornoEvento.data);
          console.log("comentario");
          console.log(retornoComentario.data);
          setComentario(retornoComentario.data)
         } catch (error) {
           alert("deu ruim");
         }
      }
      else
      {
        try {
          const retornoComentario = await api.get(`/ComentariosEvento/ListarSomenteExibe?id=${state.idEvento}`)
          // const retornoEvento = await api.get(`/Evento/${state.idEvento}`)
          // setEvento(retornoEvento.data)
          console.log("log do evento");
          // console.log(retornoEvento.data.tiposEvento.titulo);
          console.log("comentario");
          console.log(retornoComentario.data);
          setComentario(retornoComentario.data)
        } catch (error) {
          alert("deu ruim");
        }
      }
      

    }
    getEventos();
  }, []);

  console.log("log do state");
  console.log(state);

  return (
    <MainContent>
        <Container>
        <Title
        additionalClass={"custom-title"}
        titleText={state.nomeEvento}
      />
      <section className="evento-section">
      <p>Descrição: {state.descricao}</p> 
        <br />
       <p>Data do Evento: {dateFormatDbToView(state.dataEvento)}</p> 
       {/* <p>Tipo de Evento: {evento[0].tiposEvento.titulo}</p> */}
      </section>
      <Table
        dados={comentario}/>
        </Container>
      
    </MainContent>
  );
};

export default DetalhesEvento;
