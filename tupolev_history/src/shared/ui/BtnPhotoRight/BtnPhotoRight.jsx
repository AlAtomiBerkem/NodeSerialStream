export const BtnPhotoRightSVg = ({ active = false }) => {
  return (
    <svg
      width="37"
      height="44"
      viewBox="0 0 37 44"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M37 21.099L15.9385 44H0L21.0615 21.099L0 0H15.9385L37 21.099Z"
        fill={active ? '#FFFFFF' : '#A1A1A1'}
        opacity={active ? 1 : 0.4}
      />
    </svg>
  );
};