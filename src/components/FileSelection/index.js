import "./index.css";
import {FaFilePdf} from "react-icons/fa";

function FileSelection({files, setFiles}) {

  function handleDrop(e) {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    const acceptedFiles = Array.from(droppedFiles).filter(file => file.type === "application/pdf");
    acceptedFiles.forEach(file => upload(file));
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function upload(file) {
    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:8080/api/pdf/cache-file", {
      method: "POST",
      body: formData
    }).then(response => {
        if (response.ok) return response.json();
        else throw Error("API Error");
    }).then(responseJson => {
      const fileMetaData = {
        id: responseJson.id,
        name: file.name,
        size: responseJson.size,
        numberOfPages: responseJson.numberOfPages
      };
      setFiles(prevState => [...prevState, fileMetaData]);
    }).catch((error) => console.log(error));
  }

  return (
    <>
      <input id={"selectFiles"} type={"file"} multiple accept={"application/pdf"} style={{display: "none"}} onChange={(e) => Array.from(e.target.files).forEach(file => upload(file))}/>
      <button className={"select-file-button"} onClick={() => document.getElementById("selectFiles").click()}>PDF-Dateien auswählen</button>
      <div onDrop={handleDrop} onDragOver={handleDragOver} className={"drag-drop-field"}>
        {files.length === 0 ?
          <p style={{color: "gray"}}>Hier PDF-Dateien per Drag and Drop einfügen</p> :
          files.map((file, index) =>
            <div key={index} className={"file"}>
              <FaFilePdf size={50}/>
              <p className={"file-name"}>{file.name}</p>
            </div>
        )}
      </div>
    </>
  );

}

export default FileSelection;
