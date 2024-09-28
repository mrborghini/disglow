import './App.css';
import { useRef } from 'react';

function App() {
  const nextPageRef = useRef(null);

  const scrollToNextPage = () => {
    nextPageRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="App">
      {/* Video Background Section */}
      <div className="video-section">
        {/* Video element */}
        <video 
          className="background-video" 
          src={'bgvideo.mp4'} 
          autoPlay 
          loop 
          muted 
        />
        {/* Dark overlay */}
        <div className="overlay"></div>

        {/* Logo */}
        <div className="content">
          <img src="logo.svg" alt="Logo" className="logo" />
        </div>
        
        {/* Scroll text and button */}
        <div className="scroll-container">
          <p className="scroll-text text-white mb-5">scroll</p>
          <div className="scroll-down" onClick={scrollToNextPage}></div>
        </div>
      </div>

      {/* Next Page Section */}
      <div ref={nextPageRef} className="next-page">
        <h2>This is the next page</h2>
      </div>
    </div>
  );
}

export default App;
