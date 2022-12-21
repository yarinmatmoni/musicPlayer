import React, {useState,useRef} from 'react';
import "./styles/app.scss";
// Adding components 
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';
//Import Data
import data from "./data";

function App() {
  //Ref
  const audioRef = useRef(null);
  //State
  const [songs,setSongs] = useState(data());
  const [currentSong,setCurrentSong] = useState(songs[0]);
  const [isPlaying,setIsPlaying] = useState(false);
  const[librartStatus,setLibraryStatus] = useState(false);
  
  const [songInfo,setSongInfo] = useState({
    currentTime: 0,
    duration:0,
    animationPercentage:0,
  });
  
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({...setSongInfo,currentTime:current , duration:duration , animationPercentage:animation});
  };

  const songHandHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex +1 ) % songs.length]);
    if(isPlaying)
      audioRef.current.play();
  };

  return (
    <div className={`App ${librartStatus ? "library-active" : "" }`}>
      <Nav librartStatus={librartStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player setSongInfo={setSongInfo} setSongs={setSongs} setCurrentSong={setCurrentSong} songs={songs} songInfo={songInfo}  audioRef={audioRef} currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying}  />
      <Library librartStatus={librartStatus} setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} songs={songs} setSongInfo={setSongInfo} setCurrentSong={setCurrentSong} />
      <audio onEnded={songHandHandler} onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
}

export default App;