import { CoordinatesForm } from "../components/mainpage/CoordinatesForm";
import GraphForm from "../components/mainpage/Grath";
import { Table } from "../components/mainpage/table";
function MainPage() {
    return (
      <div className="MainPage">
          <>
          <CoordinatesForm/>
          <GraphForm/>
          <Table/>
        </>
      </div>
    );
  }
  
  export {MainPage};