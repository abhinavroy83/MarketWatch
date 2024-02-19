import React from "react";

function ChildContainer({ children }) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 flex h-full">
      <main>{children}</main>
      <aside className="  border-red-400 border-2 m-2">
        <p>we show the whether here</p>
      </aside>
    </div>
  );
}

export default ChildContainer;
