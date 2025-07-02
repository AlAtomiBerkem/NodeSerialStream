import timeBackground from "../../assets/Photo/TimeBackground.png";
import one from "../../assets/Photo/One.png";
import two from "../../assets/Photo/Two.png";
import three from "../../assets/Photo/Three.png";
import photoIcon from "../../assets/Photo/PhotoIcon.png";

export const Timer = ({ start }) => {
  // const [time, setTime] = useState(start);

  return (
    <div className="timer-container">
      <img src={timeBackground} alt="timeBackground" />
    </div>
  );
};

export default Timer;
