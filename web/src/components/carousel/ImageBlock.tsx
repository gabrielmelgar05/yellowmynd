import React from "react";

interface ImageBlockProps {
  src?: string;
  className?: string;
  fallbackColor: string;
}

export const ImageBlock: React.FC<ImageBlockProps> = ({
  src,
  className = "",
  fallbackColor,
}) => {
  return (
    <div
      className={`w-full h-full rounded-md bg-[${fallbackColor}] overflow-hidden ${className}`}
    >
      {src ? (
        <img src={src} alt="preview" className="w-full h-full object-cover" />
      ) : null}
    </div>
  );
};
