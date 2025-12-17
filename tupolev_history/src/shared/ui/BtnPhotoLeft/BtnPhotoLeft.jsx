export const BtnPhotoLeftSVg = ({ active = false }) => {
  return (
    <svg
      width="37"
      height="44"
      viewBox="0 0 37 44"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M-1.66893e-06 21.099L21.0615 44H37L15.9385 21.099L37 0H21.0615L-1.66893e-06 21.099Z"
        fill={active ? '#FFFFFF' : '#A1A1A1'}
        opacity={active ? 1 : 0.4}
      />
    </svg>
  );
};