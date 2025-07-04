import againBtn from "../../assets/PhotoResult/againBtn.png";
import AcceptBtn from "../../assets/PhotoResult/AcceptBtn.png";

export const BtnGroup = () => {
  return (
    <div
      className="btn-group"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <img src={againBtn} alt="againBtn" />
      <img src={AcceptBtn} alt="AcceptBtn" />
    </div>
  );
};
