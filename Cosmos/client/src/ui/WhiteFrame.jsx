import FadeIn from "./FaidIn";

const WhiteFrame = () => {
    return (
      <FadeIn delay={1.6}>
        <div className=" centered w-screen h-screen absolute inset-0 z-20 pointer-events-none">
        <img 
          src="/white-frame.png" 
          className=" w-full h-full max-w-[95%] max-h-[95%] object-contain"/>
              <FadeIn delay={1.8}>
                <button 
                  className="absolute p-0 border-none bg-transparent cursor-pointer button-hover pointer-events-auto top-[77.5%] left-[24%]">
                  <img 
                    src="/btn-done.png" 
                    className="w-auto h-auto max-w-full max-h-full"
                  />
                </button>
                  </FadeIn>
          </div>
          </FadeIn>
    )
  }

  export default WhiteFrame;