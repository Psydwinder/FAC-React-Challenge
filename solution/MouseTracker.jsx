import { useEffect, useState } from "react";

export default function MouseTracker() {
  const [coords, setCoords] = useState([0, 0]);

  useEffect(() => {
    function update({ clientX, clientY }) {
      setCoords([clientX, clientY]);
    }
    window.addEventListener("mousemove", update);
    return () => window.removeEventListener("mousemove", update);
  }, []);

  const [x, y] = coords;
  return (
    <output>
      {x},{y}
    </output>
  );
}
