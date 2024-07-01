import React, {useState, useMemo} from 'react';
import styled from "styled-components";
import bg from './img/bg.png';
import {MainLayout} from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income.js';
import Expenses from './Components/Expenses/Expenses';
import Advise from './Components/advise/advise';
import { useGlobalContext } from './context/globalContext';

function App() {
  const [active, setActive] = useState(1);

  const global = useGlobalContext();
  console.log(global);

  const displayData = () => {
    switch(active){
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Income />;
      case 4: 
        return <Expenses />;
      case 5: 
        return <Advise />;
      default: 
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <main>
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
          {displayData()}
      </MainLayout>
      </main>

    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;

  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }

  @media (max-width: 480px) {
    main {
      border-radius: 16px;
      padding: 10px;
    }

    .App {
      flex-direction: column;
    }
  }
`;

export default App;
