import {useState} from "react";
import FileSelection from "./components/FileSelection";
import MergeSpecification from "./components/MergeSpecification";

function App() {
  const [files, setFiles] = useState([]);

  return (
    <div style={{width: "1000px", margin: "0 auto"}}>
      <h1 style={{textAlign: "center", fontFamily: "Calibri, serif"}}>PDF-Dateien zusammenführen</h1>
      <FileSelection files={files} setFiles={setFiles}/>
      <MergeSpecification files={files} setFiles={setFiles}/>
      <p>test</p>
    </div>
  );
}

export default App;
