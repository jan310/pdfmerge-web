import "./index.css";
import FileSpecification from "../FileSpecification";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

function MergeSpecification({files, setFiles}) {

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const newFiles = Array.from(files); //create a copy of the files array
    const [reorderedFile] = newFiles.splice(result.source.index, 1); //remove the file that should be reordered from the array and safe it in the constant "reorderedFile"
    newFiles.splice(result.destination.index, 0, reorderedFile); //inject reorderedFile back into the array at its correct destination index
    setFiles(newFiles);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId={"files"}>
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {files.map((file, index) => {
              return (
                <Draggable key={file.id} draggableId={file.id} index={index}>
                  {(provided) => (
                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                      <FileSpecification file={file}/>
                    </li>
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )

}

export default MergeSpecification;