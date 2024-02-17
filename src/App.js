import { Container } from "@mui/material";
import "./App.css";
import BudgetTrackerPlus from "./pages/BudgetTrackerPlus";


function App() {
  return (
    <Container maxWidth="xxl" sx={{justifyContent:'center', display:'flex', flexDirection:'row', backgroundColor:'skyblue', height: '100vh', width:'100vw'}}>
        <BudgetTrackerPlus/>
    </Container>
  );
}

export default App;
