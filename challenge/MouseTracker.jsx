import { useEffect, useState } from "react"; //The component imports the useEffect and useState hooks from the React library.

export default function MouseTracker() {
  const [coords, setCoords] = useState([0, 0]); // The component defines a state variable coords using useState, which is set to an initial value of [0, 0].

  useEffect(() => {
    //The component sets up an effect using the useEffect hook, which is run on each render.
    function update({ clientX, clientY }) {
      //Within the effect, a update function is defined that takes an event object with clientX and clientY properties, which represent the current mouse position.
      setCoords([clientX, clientY]); //The function calls setCoords with an array containing clientX and clientY to update the state with the current mouse position.
    }
    window.addEventListener("mousemove", update); //The effect then adds a mousemove event listener to the window object and returns a cleanup function that removes the event listener.
    return () => window.removeEventListener("mousemove", update);
  }, []);

  const [x, y] = coords; //The component destructures the coords state variable into x and y.
  return ( //The component returns a <output> element that displays the current mouse position x and y.
    <output>
      {x},{y}
    </output>
  );
}
