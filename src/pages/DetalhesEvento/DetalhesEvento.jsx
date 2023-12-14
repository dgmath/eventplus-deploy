import React, { useEffect, useState } from "react";
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Title/Title";
import api from "../../Services/Service";
import Table from "./TableComentario/TableComentario"
import { useLocation, useParams } from "react-router-dom";
import Container from "../../components/Container/Container";

const DetalhesEvento = () => {
  const [comentario, setComentario] = useState([]);
  const [comentarioIa, setComentarioIa] = useState([]);
  const [evento, setEvento] = useState([]);

  const {state} = useLocation();

  const { idEvento } = useParams();
  useEffect(() => {
    async function getEventos() {
      try {
       const retornoComentario = await api.get(`/ComentariosEvento`)
       setComentario(retornoComentario.data)
      } catch (error) {
        alert("deu ruim");
      }
    }
    getEventos();
  }, []);

  console.log(state);

  return (
    <MainContent>
        <Container>
        <Title
        additionalClass={"custom-title"}
        titleText={"Comentarios do evento"}
      />
      {/* <p> id do evento: {idEvento}</p> */}
      <>
       descricao: {state.descricao}
        <br />
        {state.nomeEvento}
        <br />
      </>
      {/* descricao data tipo inst  */}
      <Table
        dados={comentario}/>
        </Container>
      
    </MainContent>
  );
};

export default DetalhesEvento;
