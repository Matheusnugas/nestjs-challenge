import React, { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
const EmptyLottieAnimURL = new URL(
  "../../../assets/emptyLottie.json",
  import.meta.url
).href;

const AstroLottie = () => {
  const [dotLottie, setDotLottie] = useState(null);

  const dotLottieRefCallback = (dotLottie) => {
    setDotLottie(dotLottie);
  };

  useEffect(() => {
    // Remova a tentativa de definir `loop` diretamente no objeto dotLottie
  }, [dotLottie]);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-64 h-64 md:w-96 lg:h-96">
        <DotLottieReact
          src={EmptyLottieAnimURL}
          autoplay
          loop
          dotLottieRefCallback={dotLottieRefCallback}
        />
      </div>
    </div>
  );
};

export default AstroLottie;
