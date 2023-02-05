import {useState} from "react";
import FileSelection from "./components/FileSelection";
import MergeSpecification from "./components/MergeSpecification";
import FilePreview from "./components/FilePreview";

function App() {

  const [currentStep, setCurrentStep] = useState("FileSelection");
  const [files, setFiles] = useState([]);

  function displayCurrentStep() {
    if (currentStep === "FileSelection") return <FileSelection files={files} setFiles={setFiles} setCurrentStep={setCurrentStep}/>;
    else if (currentStep === "MergeSpecification") return <MergeSpecification files={files} setFiles={setFiles} setCurrentStep={setCurrentStep}/>;
    else return <FilePreview files={files} setFiles={setFiles} setCurrentStep={setCurrentStep}/>
  }

  return (
    <div style={{width: "1000px", margin: "0 auto"}}>
      <h1 style={{textAlign: "center", fontFamily: "Calibri, serif", marginBottom: "75px"}}>PDF-Dateien zusammenführen</h1>
      {displayCurrentStep()}
    </div>
  );

}

export default App;
