import "./index.css";
import FileSpecification from "../FileSpecification";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

function MergeSpecification({files, setFiles, setCurrentStep}) {

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
      <div style={{marginTop: "50px", display: "flex", justifyContent: "space-between"}}>
        <button style={{marginLeft: "0", width: "350px", fontWeight: "bold"}} onClick={() => setCurrentStep("FileSelection")}>Zurück zu Schritt 1</button>
        <button style={{marginRight: "0", width: "350px", fontWeight: "bold"}} onClick={() => {if (files.length > 0 && files.every(file => file.selectedPages !== "error")) setCurrentStep("FilePreview")}}>PDF-Dateien zusammenführen</button>
      </div>
    </>
  )

}

export default MergeSpecification;