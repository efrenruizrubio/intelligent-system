import { Header, MainContainer, Aside, Section } from "components";

const name = " Efrén Ruíz Rubio";
const asideTitle = "Dashboard";
const sectionTitle = "Content";

const DashboardPage = () => {
  return (
    <>
      <Header title={`Bienvenido, ${name}`} />
      <MainContainer>
        <Aside title={asideTitle} />
        <Section title={sectionTitle} />
      </MainContainer>
    </>
  );
};

export default DashboardPage;
