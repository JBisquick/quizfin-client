import { useEffect, useState } from 'react';
import styles from './CountDown.module.css';

const CountDown = ({ count }) => {
  const stroke = "rgb(32, 128, 165)";
  const strokeWidth = 8;
  const size = 52;
  const strokeLinecap = 'round';

  const radius = size / 2;
  const circumference = size * Math.PI;

  const strokeDashoffset = circumference - (count / 10) * circumference;

  return (
    <div className={styles.container}>
      <label className={styles.seconds}>{count}</label>
      <div className={styles.countDownContainer}>
        <svg className={styles.svg} width={size} height={size}>
          <circle
            className={styles.circle}
            fill="none"
            r={radius}
            cx={radius}
            cy={radius}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
      </div>
    </div>
  );
};

export default CountDown;