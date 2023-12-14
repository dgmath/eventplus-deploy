import React, { useContext, useEffect, useState } from "react";
import MainContent from "../../components/MainContent/MainContent";
import Banner from "../../components/Banner/Banner";
import VisionSection from "../../components/VisionSection/VisionSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import NextEvent from "../../components/NextEvent/NextEvent";
import Container from "../../components/Container/Container";
import Title from "../../components/Title/Title";




//link to detalhes-evento/idEvento 

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./HomePage.css";

import { Pagination } from "swiper/modules";

import api from "../../Services/Service";
import { UserContext } from "../../context/AuthContext";
import PastEvent from "../../components/PastEvent/PastEvent";

const HomePage = () => {

  const {userData} = useContext(UserContext)
  console.log(userData);

  useEffect(() => {
    async function getEventos() {
      try {
        const retornoEvento = await api.get(
          "/Evento/ListarProximos"
        );
        const retorno = await api.get(
          "/Evento/ListarAnteriores"
        );
        console.log(retornoEvento.data);
        setNextEvents(retornoEvento.data);
        console.log(retorno.data);
        setPastEvents(retorno.data);
      } catch (error) {
        console.log("Deu ruim na api");
      }
}
    getEventos();

    console.log("A Home foi montada!!!");
  }, []);

  const [nextEvents, setNextEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);

  return (
    <MainContent>
      <Banner />

      {/* Próximos eventos */}

      <section className="proximos-eventos">
        <Container>
          <Title titleText={"Próximos Eventos"} />

          <div className="events-box">
            <Swiper
              slidesPerView={ window.innerWidth >= 992 ? 4 : 1 }
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {nextEvents.map((e) => {
                return (
                  <SwiperSlide>
                    <NextEvent
                      title={e.nomeEvento}
                      description={e.descricao}
                      eventDate={e.dataEvento}
                      idEvento={e.idEvento}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <Title titleText={"Eventos Passados"} />

          <div className="events-box">
            <Swiper
              slidesPerView={ window.innerWidth >= 992 ? 4 : 1 }
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {pastEvents.map((e) => {
                return (
                  <SwiperSlide>
                    <PastEvent
                      title={e.nomeEvento}
                      description={e.descricao}
                      eventDate={e.dataEvento}
                      idEvento={e.idEvento}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

        </Container>
      </section>

      <VisionSection />
      <ContactSection />
    </MainContent>
  );
};

export default HomePage;
