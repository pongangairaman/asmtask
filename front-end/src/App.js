import { Card } from "reactstrap";
import AddDetail from "./Components/AddDetail";
import Table from "./Components/DataTable";

function App() {
  return (
    <Card className="App">
      <AddDetail />
      <Table />
    </Card>
  );
}

export default App;
