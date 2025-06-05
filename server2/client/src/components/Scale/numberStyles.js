import { fontStyles } from "../../helpers/fontStyle";

export const numberStyles = {
  'current-unanswered': { 
    color: '#FFFFFF',
    fontWeight: 700,
    fontSize: '22px',
    opacity: 1,
    fontFamily: fontStyles,

  },
  'current-answered': { 
    color: '#72D8FF',
    fontWeight: 700,
    fontSize: '22px',
    opacity: 1,
    fontFamily: fontStyles,
  },
  'unanswered': { 
    color: '#A1A1A1',
    fontWeight: 500,
    fontSize: '20px',
    opacity: 0.7,
    fontFamily: fontStyles,

  },
  'answered': { 
    color: '#5b9db7',
    fontWeight: 500,
    fontSize: '20px',
    opacity: 0.9,
    fontFamily: fontStyles,
 
  }
};

export const animationDuration = 300;