import {useEffect, useState} from "react";

function FilePreview({files, setFiles, setCurrentStep}) {

  const [mergedFile, setMergedFile] = useState(null);

  function getMergedFile(mergeType, requestBody) {
    fetch(`http://localhost:8080/api/pdf/${mergeType}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: requestBody
    }).then(response => {
      if (response.ok) return response.blob();
      else throw Error("API Error");
    }).then(responseBlob => setMergedFile(responseBlob))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    if (files.every(file => file.selectedPages === "all")) {
      const ids = [];
      files.forEach(file => ids.push(file.id));
      const requestBody = JSON.stringify({ids: ids});
      getMergedFile("merge-files", requestBody);
    }
    else {
      const fileSpecifications = [];
      files.forEach(file => {
        const fileSpecification = {
          fileId: file.id,
          pageNumbers: []
        };
        if (file.selectedPages === "all") for (let i = 1; i <= file.numberOfPages; i++) fileSpecification.pageNumbers.push(i);
        else fileSpecification.pageNumbers = file.selectedPages;
        fileSpecifications.push(fileSpecification);
      });
      const requestBody = JSON.stringify({fileSpecifications: fileSpecifications});
      getMergedFile("merge-pages", requestBody);
    }
  }, []);

  return (
    <>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <button style={{margin: "0", width: "275px", fontWeight: "bold"}} onClick={() => setCurrentStep("MergeSpecification")}>Zurück zu Schritt 2</button>
        <button disabled={mergedFile === null} style={{margin: "0", width: "275px", fontWeight: "bold"}} onClick={() => {
          const downloadLink = document.createElement("a");
          downloadLink.href = URL.createObjectURL(mergedFile);
          downloadLink.download = "merged.pdf";
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        }}>Download</button>
        <button style={{margin: "0", width: "275px", fontWeight: "bold"}} onClick={() => {
          setFiles([]);
          setCurrentStep("FileSelection");
        }}>Neues Dokument erstellen</button>
      </div>
      {mergedFile === null ? <></> : <iframe title={"merged.pdf"} src={URL.createObjectURL(mergedFile)} style={{width: "1000px", height: "500px", marginTop: "20px"}}/>}
    </>
  );

}

export default FilePreview;