import React, { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
const loadingLottieUrl = new URL(
  "../../../assets/loadingLottie.json",
  import.meta.url
).href;

const LoadingLottie = () => {
  const [dotLottie, setDotLottie] = useState(null);
  const [playCount, setPlayCount] = useState(0);

  const dotLottieRefCallback = (dotLottie) => {
    setDotLottie(dotLottie);
  };

  useEffect(() => {
    const onComplete = () => {
      setPlayCount((prevCount) => {
        const newCount = prevCount + 1;
        if (newCount < 3) {
          dotLottie.play();
        }
        return newCount;
      });
    };

    if (dotLottie) {
      dotLottie.addEventListener("complete", onComplete);
    }

    return () => {
      if (dotLottie) {
        dotLottie.removeEventListener("complete", onComplete);
      }
    };
  }, [dotLottie]);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-64 h-64 md:w-96 lg:h-96">
        {/* Tamanhos ajustados para diferentes tamanhos de tela */}
        <DotLottieReact
          src={loadingLottieUrl}
          autoplay
          dotLottieRefCallback={dotLottieRefCallback}
        />
      </div>
    </div>
  );
};

export default LoadingLottie;
