/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";

import { useEffect, useRef } from "react";

export default function Video({ srcObject, ...props }) {
  const refVideo = useRef(null);

  useEffect(() => {
    if (!refVideo.current) return;
    refVideo.current.srcObject = srcObject;
  }, [srcObject]);

  return <video ref={refVideo} {...props} />;
}
