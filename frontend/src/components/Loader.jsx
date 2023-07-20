import React from "react";
import { TailSpin } from "react-loader-spinner";

function Loader() {
  return (
    <div className="flex justify-center">
      <TailSpin
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="3"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default Loader;
