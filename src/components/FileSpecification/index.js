import "./index.css";
import {faFilePdf, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function FileSpecification({file, setFiles, index}) {

  function checkInput() {
    setFiles(prevState => {
      const updatedFiles = prevState;
      updatedFiles[index].pageSelectionTextBox = document.getElementById(file.id).value;
      return updatedFiles;
    });
    const regex = new RegExp("^\\s*(\\d+)\\s*(?:-\\s*(\\d+)\\s*|)\\s*(?:,\\s*(\\d+)\\s*(?:-\\s*(\\d+)\\s*|)\\s*)*$")
    const inputValue = document.getElementById(file.id).value.replace(/\s+/g, "");
    if (regex.test(inputValue)) {
      let zeroError = false;
      let maxError = false;
      const pageNumbers = [];
      const elements = inputValue.split(",");
      elements.forEach(element => {
        if (element.includes("-")) {
          const numbers = element.split("-");
          const number1 = Number(numbers[0]);
          const number2 = Number(numbers[1]);
          if (number1 === 0 || number2 === 0) {
            zeroError = true;
            return;
          }
          if (number1 > file.numberOfPages || number2 > file.numberOfPages) {
            maxError = true;
            return;
          }
          if (number1 < number2) {
            for (let i = number1; i <= number2; i++) pageNumbers.push(i);
          }
          else if (number1 > number2) {
            for (let i = number1; i >= number2; i--) pageNumbers.push(i);
          }
          else pageNumbers.push(number1);
        }
        else {
          const number = Number(element);
          if (number === 0) {
            zeroError = true;
            return;
          }
          if (number > file.numberOfPages) {
            maxError = true;
            return;
          }
          pageNumbers.push(number);
        }
      });
      if (zeroError) {
        setFiles(prevState => {
          const updatedFiles = Array.from(prevState);
          updatedFiles[index].selectedPages = "zero-error";
          return updatedFiles;
        });
      }
      else if (maxError) {
        setFiles(prevState => {
          const updatedFiles = Array.from(prevState);
          updatedFiles[index].selectedPages = "max-error";
          return updatedFiles;
        });
      }
      else {
        setFiles(prevState => {
          const updatedFiles = Array.from(prevState);
          updatedFiles[index].selectedPages = pageNumbers;
          return updatedFiles;
        });
      }
    }
    else {
      setFiles(prevState => {
        const updatedFiles = Array.from(prevState);
        updatedFiles[index].selectedPages = "format-error";
        return updatedFiles;
      });
    }
  }

  return (
    <div className={"file-specification-container"}>
      <div className={"file-specification-left"}>
        <FontAwesomeIcon icon={faFilePdf} size={"3x"} style={{margin: "5px 5px"}}/>
        <p style={{margin: "0 5px", fontSize: "20px"}}>{file.name} ({file.numberOfPages} Seiten, {file.size} Bytes)</p>
      </div>
      <div className={"file-specification-right"}>
        <p style={{margin: "5px 5px", fontSize: "20px"}}>Seiten:</p>
        <p style={{margin: "5px 5px", fontSize: "20px"}}>alle</p>
        <input type={"checkbox"} defaultChecked={file.allPagesSelectedCheckBox} style={{margin: "5px 5px 5px 0", width: "18px", height: "18px", accentColor: "black"}} onChange={() => {
          if (file.allPagesSelectedCheckBox) {
            setFiles(prevState => {
              const updatedFiles = Array.from(prevState);
              updatedFiles[index].allPagesSelectedCheckBox = false;
              return updatedFiles;
            });
            document.getElementById(file.id).disabled = false;
            document.getElementById(file.id).focus();
          }
          else {
            setFiles(prevState => {
              const updatedFiles = Array.from(prevState);
              updatedFiles[index].allPagesSelectedCheckBox = true;
              return updatedFiles;
            });
          }
        }}/>
        <div className={"tooltip"}>
          <input id={file.id} type={"text"} style={{margin: "5px 5px 5px 0"}} defaultValue={file.pageSelectionTextBox} onBlur={checkInput} disabled={file.allPagesSelectedCheckBox}/>
          <span className={"tooltiptext"} style={{visibility: !file.allPagesSelectedCheckBox && file.selectedPages === "format-error" ? "visible" : "hidden"}}>Ungültige Eingabe (siehe Info)</span>
          <span className={"tooltiptext"} style={{visibility: !file.allPagesSelectedCheckBox && file.selectedPages === "zero-error" ? "visible" : "hidden"}}>Ungültige Seite (0)</span>
          <span className={"tooltiptext"} style={{visibility: !file.allPagesSelectedCheckBox && file.selectedPages === "max-error" ? "visible" : "hidden"}}>Dokument hat nur {file.numberOfPages} Seiten</span>
        </div>
        <FontAwesomeIcon icon={faTrashCan} size={"2x"} style={{margin: "5px 5px", cursor: "pointer"}} onClick={() => setFiles(prevState => prevState.filter(f => f.id !== file.id))}/>
      </div>
    </div>
  );

}

export default FileSpecification;