import './styles/global.css';
import GrowthStageChart from './components/GrowthStageChart';
import { Container, ChartContainer } from './styles/app';

function App() {
  return (
    <Container>
      <h1>
        Growth Stage
      </h1>
      
      <ChartContainer>
        <GrowthStageChart />
      </ChartContainer>
    </Container>
  );
}

export default App;