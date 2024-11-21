import React, { useState, useEffect } from 'react';
import dayjs from "@/lib/dayjs";
import { Detik } from '@/lib/time';

export function RealtimeDate() {
  return dayjs().format("dddd, DD MMMM YYYY");
}

export function RealtimeClock() {
  const [time, setTime] = useState(dayjs().format("HH:mm:ss"));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs().format("HH:mm:ss"));
    }, Detik(1));
    return () => clearInterval(interval); // Bersihkan interval saat komponen di-unmount
  }, []);

  return <div>{time}</div>
}
