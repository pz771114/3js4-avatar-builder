import React, { useState, useEffect } from "react";
import { useStore } from "../store";
const DownloadButton = () => {
  return (
    <button className="rounded-lg bg-indigo-500 hover:bg-indigo-100 transition-colors duration-300 text-white font-medium px-4 py-3 pointer-events-auto">
      Download
    </button>
  );
};

const AssetsBox = () => {
  const categories = useStore((state) => state.categories);
  const assets = useStore((state) => state.assets);
  const customization = useStore((state) => state.customization);
  const fethCategories = useStore((state) => state.fetchCategories);
  const fetchAssets = useStore((state) => state.fetchAssets);
  const changeAsset = useStore((state) => state.changeAsset);
  //const currentCategory = useStore((state) => state.currentCategory);
  // const setCurrentCategory = useStore((state) => state.setCurrentCategory);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    fethCategories();
  }, []);
  return (
    <div className="rounded-2xl bg-white drop-shadow-md p-6 gap-6 flex flex-col">
      <div className="flex items-center gap-6 pointer-events-auto">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => {
              setCurrentCategory(category);
            }}
            className={` transition-colors duration-200 font-medium ${
              currentCategory?.name === category.name
                ? "text-indigo-500"
                : " text-gray-500 hover:text-gray-700"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        {currentCategory?.assets.map((asset) => (
          <button
            key={asset.thumbnail}
            onClick={() => {
              changeAsset(currentCategory.name, asset);
            }}
            className={`w-20 h-20 rounded-md overflow-hidden bg-gray-200 pointer-events-auto hover: opacity-100 transition-all border-2 duration-500 ${
              customization[currentCategory.name]?.asset?.id === asset.id
                ? "border-indigo-600 opacity-100"
                : "opacity-50 border-transparent"
            } `}
          >
            <img src={asset.thumbnail} />
          </button>
        ))}
      </div>
    </div>
  );
};
const UI = () => {
  return (
    <main className="pointer-events-none fixed z-10 inset-0 p-10">
      <div className="mx-auto h-full max-w-screen-xl w-full flex flex-col justify-between">
        <a
          className=" pointer-events-auto"
          href="https://threejs4-avatar-builder.onrender.com"
        >
          <img className="w-20" src="/images/logo.svg" />
        </a>
        <DownloadButton />
        <div className="flex flex-col gap-6">
          <AssetsBox />
        </div>
      </div>
    </main>
  );
};

export default UI;
