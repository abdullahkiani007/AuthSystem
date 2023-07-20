import React from "react";

function CodeInput(props) {
  return (
    <div className="flex space-between">
      <input
        className="w-10 m-2 rounded-sm h-10 text-center font-bold "
        type="text"
        pattern="[1-9]"
        maxLength="1"
      />
    </div>
  );
}

export default CodeInput;
