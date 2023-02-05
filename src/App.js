import {useState} from "react";
import FileSelection from "./components/FileSelection";
import MergeSpecification from "./components/MergeSpecification";
import FilePreview from "./components/FilePreview";

function App() {
  const [currentStep, setCurrentStep] = useState("FileSelection");
  const [files, setFiles] = useState([/*
    {
      id: "1",
      name: "file1.pdf",
      size: 50000,
      numberOfPages: 5,
      selectedPages: "all"
    },
    {
      id: "2",
      name: "file2.pdf",
      size: 60000,
      numberOfPages: 6,
      selectedPages: "all"
    },
    {
      id: "3",
      name: "file3.pdf",
      size: 70000,
      numberOfPages: 7,
      selectedPages: "all"
    },*/
  ]);

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
