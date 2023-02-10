import { useState } from "react";

export default function Shouter() {
  const [message, setMessage] = useState("");
  function update(event) {
    setMessage(event.target.value);
  }
  return (
    <>
      <input value={message} onChange={update} />
      <output>{message.toUpperCase()}</output>
    </>
  );
}
