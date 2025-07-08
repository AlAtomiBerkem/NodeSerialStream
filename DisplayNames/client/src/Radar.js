import React, { useRef, useEffect } from 'react';
import radarBg from './assets/radar.png';

const RADAR_WIDTH = 1280;
const RADAR_HEIGHT = 650;
const SWEEP_SPEED = 0.5;
const SWEEP_WIDTH = 2;
const SWEEP_COLOR = 'rgba(0, 180, 255, 0.8)';

function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

const Radar = () => {
  const canvasRef = useRef(null);
  const sweepAngleRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let animationFrameId;

    const draw = () => {
      ctx.clearRect(0, 0, RADAR_WIDTH, RADAR_HEIGHT);
      const angle = sweepAngleRef.current;
      ctx.save();
      ctx.translate(RADAR_WIDTH / 2 + 9, RADAR_HEIGHT + 21);
      ctx.rotate(degToRad(angle - 90));
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -RADAR_HEIGHT);
      ctx.strokeStyle = SWEEP_COLOR;
      ctx.lineWidth = SWEEP_WIDTH;
      ctx.shadowColor = SWEEP_COLOR;
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.restore();
      sweepAngleRef.current += SWEEP_SPEED;
      if (sweepAngleRef.current >= 360) sweepAngleRef.current -= 360;
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: RADAR_WIDTH,
        height: RADAR_HEIGHT,
        margin: '0 auto',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        width={RADAR_WIDTH}
        height={RADAR_HEIGHT}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default Radar; 