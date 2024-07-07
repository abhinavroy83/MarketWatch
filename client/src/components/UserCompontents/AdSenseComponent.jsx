import React, { useEffect } from "react";

const AdSenseComponent = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`;
    script.setAttribute("data-ad-client", "ca-pub-6553654955314568");
    document.head.appendChild(script);
  }, []);

  return (
    <div>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6553654955314568"
        data-ad-slot="your-ad-slot"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <script>{`(adsbygoogle = window.adsbygoogle || []).push({});`}</script>
    </div>
  );
};

export default AdSenseComponent;
