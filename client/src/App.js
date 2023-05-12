import { useState, useEffect, useRef } from 'react';
import './App.css';
import { uploadFile } from './service/api';
import { Watch } from 'react-loader-spinner'

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');

  const[progress,setProgress]=useState(null)

  const fileInputRef = useRef();

  const url = 'https://i.pinimg.com/originals/16/46/24/1646243661201a0892cc4b1a64fcbacf.jpg';

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        setProgress(true)
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setResult(response.path);
        setProgress(null)
      }
    }
    getImage();
  }, [file])

  const onUploadClick = () => {
    fileInputRef.current.click();
  }

  return (
    <div className='container'>
      {/* <img src={url}  /> */}
      <div className='img'>

      </div>
      <div className='wrapper'>
        <h1>Limitless Transfer!</h1>
        <p style={{marginBottom:"3px"}}>Upload and share the download link.</p>
        <Watch
          height="80"
          width="80"
          radius="48"
          color="#4fa94d"
          ariaLabel="watch-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={progress?true:false}
        />
        <button onClick={() => onUploadClick()} style={{pointerEvents:progress?"none":"all", cursor:"pointer"}}>Upload</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <a href={result} target='_blank'>{result}</a>
      </div>
    </div>
  );
}

export default App;
