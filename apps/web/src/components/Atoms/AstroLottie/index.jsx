import React, { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
const astroLottieURL = new URL(
  "../../../assets/astroLottie.json",
  import.meta.url
).href;

const AstroLottie = () => {
  const [dotLottie, setDotLottie] = useState(null);

  const dotLottieRefCallback = (dotLottie) => {
    setDotLottie(dotLottie);
  };

  useEffect(() => {}, [dotLottie]);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-64 h-64 md:w-96 lg:h-96">
        <DotLottieReact
          src={astroLottieURL}
          autoplay
          loop
          dotLottieRefCallback={dotLottieRefCallback}
        />
      </div>
    </div>
  );
};

export default AstroLottie;
