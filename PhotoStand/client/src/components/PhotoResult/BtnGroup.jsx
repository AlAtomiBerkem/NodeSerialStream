import againBtn from "../../assets/PhotoResult/again.png";
import AcceptBtn from "../../assets/PhotoResult/AcceptBtn.png";

export const BtnGroup = ({ onAgain, onAccept }) => {
  return (
    <div className="btn-group">
      <img src={againBtn} alt="againBtn" onClick={onAgain} style={{ cursor: 'pointer' }} />
      <img src={AcceptBtn} alt="AcceptBtn" onClick={onAccept} style={{ cursor: 'pointer' }} />
    </div>
  );
};
