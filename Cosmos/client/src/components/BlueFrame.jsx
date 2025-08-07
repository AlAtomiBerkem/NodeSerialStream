const BlueFrame = () => {
    return (
      <div className=" centered w-screen h-screen absolute inset-0 z-20 pointer-events-none">
        <img 
          src="/blue-frame.png" 
          className=" w-full h-full max-w-[95%] max-h-[95%] object-contain"
        />
        
        <button 
          className="absolute p-0 border-none bg-transparent cursor-pointer pointer-events-auto top-[77.5%] left-[24%]">
          <img 
            src="/btn-add-photo.png" 
            className="w-auto h-auto max-w-full max-h-full"
          />
        </button>
      </div>
    )
  }

  export default BlueFrame;