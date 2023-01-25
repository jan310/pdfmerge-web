import "./index.css";

function FileSpecification({file}) {

  return (
    <div className={"file-specification"}>
      <p>{file.name}</p>
    </div>
  )
}

export default FileSpecification;