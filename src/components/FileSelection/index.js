import "./index.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilePdf, faCircleInfo} from "@fortawesome/free-solid-svg-icons";

function FileSelection({files, setFiles, setCurrentStep}) {

  function handleDrop(e) {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    const acceptedFiles = Array.from(droppedFiles).filter(file => file.type === "application/pdf");
    acceptedFiles.forEach(file => upload(file));
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function removeFile(e, id) {
    e.preventDefault();
    setFiles(files.filter((file) => file.id !== id));
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
        numberOfPages: responseJson.numberOfPages,
        selectedPages: [],
        allPagesSelectedCheckBox: true,
        pageSelectionTextBox: ""
      };
      setFiles(prevState => [...prevState, fileMetaData]);
    }).catch((error) => console.log(error));
  }

  return (
    <>
      <h3>Schritt 1: Laden Sie die PDF-Dateien hoch, aus denen eine neue Datei erstellt werden soll</h3>
      <input id={"selectFiles"} type={"file"} multiple accept={"application/pdf"} style={{display: "none"}} onChange={(e) => Array.from(e.target.files).forEach(file => upload(file))}/>
      <button onClick={() => document.getElementById("selectFiles").click()}>PDF-Dateien auswählen</button>
      <div onDrop={handleDrop} onDragOver={handleDragOver} className={"drag-drop-field"}>
        {files.length === 0 ?
          <p style={{color: "gray"}}>Hier PDF-Dateien per Drag and Drop einfügen</p> :
          files.map((file, index) =>
            <div key={index} className={"file"}>
              <FontAwesomeIcon icon={faFilePdf} size={"3x"} onContextMenu={(e) => removeFile(e, file.id)}/>
              <p className={"file-name"} onContextMenu={(e) => removeFile(e, file.id)}>{file.name}</p>
            </div>
        )}
      </div>
      <div style={files.length > 0 ? {display: "block"} : {display: "none"}}>
        <FontAwesomeIcon icon={faCircleInfo} size={"lg"} style={{display: "inline-block", marginRight: "5px"}}/>
        <p style={{display: "inline-block", fontFamily: "Calibri, serif", marginTop: "8px"}}>Klicken Sie mit der rechten Maustaste auf eine Datei, falls Sie diese wieder entfernen möchten.</p>
        <button style={{width: "100%", fontWeight: "bold", marginTop: "50px"}} onClick={() => setCurrentStep("MergeSpecification")}>Weiter zu Schritt 2</button>
      </div>
    </>
  );

}

export default FileSelection;
