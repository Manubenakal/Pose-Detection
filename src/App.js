import React, {useRef, useState} from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl';

function App() {

  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
    console.log(event.target.files[0])

  }
  
  
  const [type,setType]=useState("");
    async function detect(){
    const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet);

const preview =type=="image" ? document.querySelector('img'):document.querySelector('video');
  
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    // convert image file to base64 string
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
    const poses = await detector.estimatePoses(preview);
    console.log(poses);
    setdata(poses)

   }
   const fileRef=useRef();
   const [data,setdata]=useState();
  return (
    <div className="App" id="files">
        
          <h1 className="head">Pose Detection</h1>
          
          <button className='btnn' onClick={()=>setType("image")}>Image</button>
          <button className='btnn' onClick={()=>setType("video")}>Video</button>
          
           <br/>
                     <input  type="file" onChange={(e)=>handleChange(e)}/>
           

          {type=="image" && <img id="img" height="200px" width="200px" />}
          {type=="video" && <video height="200px" width="200px" id="video" />}

          <button type="submit"  onClick={()=>{detect(file)}}>Upload</button>
        
        
    </div>
    


  );
}

export default App;
