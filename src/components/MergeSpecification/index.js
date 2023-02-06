import "./index.css";
import FileSpecification from "../FileSpecification";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";

function MergeSpecification({files, setFiles, setCurrentStep}) {

  const [infoTextVisible, setInfoTextVisible] = useState(false);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const newFiles = Array.from(files); //create a copy of the files array
    const [reorderedFile] = newFiles.splice(result.source.index, 1); //remove the file that should be reordered from the array and safe it in the constant "reorderedFile"
    newFiles.splice(result.destination.index, 0, reorderedFile); //inject reorderedFile back into the array at its correct destination index
    setFiles(newFiles);
  }

  return (
    <>
      <h3>Schritt 2: Ziehen Sie Ihre Dateien per Drag and Drop in die gewünschte Reihenfolge</h3>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId={"files"}>
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {files.map((file, index) => {
                return (
                  <Draggable key={file.id} draggableId={file.id} index={index}>
                    {(provided) => (
                      <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <FileSpecification file={file} setFiles={setFiles} index={index}/>
                      </li>
                    )}
                  </Draggable>
                )
              })}
              <div style={{marginBottom: "10px"}}>{provided.placeholder}</div>
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <div style={{marginTop: "50px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <button style={{marginLeft: "0", width: "350px", fontWeight: "bold"}} onClick={() => setCurrentStep("FileSelection")}>Zurück zu Schritt 1</button>
        <FontAwesomeIcon icon={faCircleInfo} size={"2x"} className={"info"} onMouseEnter={() => setInfoTextVisible(true)} onMouseLeave={() => setInfoTextVisible(false)}/>
        <button style={{marginRight: "0", width: "350px", fontWeight: "bold"}} onClick={() => {if (files.length > 0 && files.every(file => !file.selectedPages.includes("error") || file.allPagesSelectedCheckBox)) setCurrentStep("FilePreview")}}>PDF-Dateien zusammenführen</button>
      </div>
      <p className={"info-text"} style={{visibility: infoTextVisible ? "visible" : "hidden"}}>
        Falls Sie von einem Dokument nur bestimmte Seiten benötigen, können Sie diese in dem Textfeld der jeweiligen Datei angeben.<br/>
        Bitte geben Sie in diesem Fall die Seitenzahlen (durch Kommas getrennt) in der gewünschten Reihenfolge an.<br/>
        Beispiel: Durch die Eingabe <span style={{fontStyle: "italic"}}>2,3-5,1,4-1</span> werden folgende Seiten nacheinander zusammengefügt: 2,3,4,5,1,4,3,2,1.
      </p>
    </>
  )

}

export default MergeSpecification;