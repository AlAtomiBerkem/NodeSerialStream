import React, { useRef, useEffect } from 'react';
import radarBg from './assets/radar.png';

const RADAR_WIDTH = 1280;
const RADAR_HEIGHT = 720;
const SWEEP_SPEED = 2;
const SWEEP_WIDTH = 2;
const SWEEP_COLOR = 'rgba(0, 180, 255, 0.8)';
const TRAIL_LENGTH = 1080; // (360 / SWEEP_SPEED) * SUBSTEPS для полного покрытия круга

function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

const Radar = () => {
  const canvasRef = useRef(null);
  const sweepAngleRef = useRef(0);
  const trailRef = useRef([]); // добавляем trail

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const SUBSTEPS = 6; // эмулируем увеличение FPS

    const draw = () => {
      ctx.clearRect(0, 0, RADAR_WIDTH, RADAR_HEIGHT);

      for (let sub = 0; sub < SUBSTEPS; sub++) {
        // Промежуточный угол для подшага
        const angle = sweepAngleRef.current + (SWEEP_SPEED * sub) / SUBSTEPS;
        trailRef.current.push(angle);
        if (trailRef.current.length > TRAIL_LENGTH) {
          trailRef.current.shift();
        }
      }

      // Рисуем шлейф с тремя зонами: синий, пустой, затемняющий
      trailRef.current.forEach((a, i) => {
        ctx.save();
        ctx.translate(RADAR_WIDTH / 2, RADAR_HEIGHT - 10);
        ctx.rotate(degToRad(a - 90));
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -RADAR_HEIGHT + 85);

        const n = trailRef.current.length;
        const blueZone = 30;
        const darkZone = n - blueZone; // затемнение до самой стрелки
        // Промежуток между ними — ничего не рисуем

        if (i > n - blueZone) {
          // 1. Синий шлейф
          const alpha = 0.4 * ((i - (n - blueZone) + 1) / blueZone);
          ctx.strokeStyle = `rgba(0, 180, 255, ${alpha})`;
          ctx.lineWidth = SWEEP_WIDTH;
          ctx.shadowColor = SWEEP_COLOR;
          ctx.shadowBlur = 12;
          ctx.stroke();
        } else if (i < darkZone) {
          // 3. Затемнение (очень длинное и тёмное)
          const alpha = 0.55 * ((darkZone - i) / darkZone);
          ctx.strokeStyle = `rgba(0,0,0,${alpha})`;
          ctx.lineWidth = SWEEP_WIDTH + 1;
          ctx.shadowColor = 'rgba(0,0,0,0.2)';
          ctx.shadowBlur = 0;
          ctx.stroke();
        }
        // 2. Промежуток — ничего не рисуем

        ctx.restore();
      });

      // После SUBSTEPS обновляем sweepAngle
      sweepAngleRef.current -= SWEEP_SPEED;
      if (sweepAngleRef.current < 0) sweepAngleRef.current += 360;
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      style={{
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