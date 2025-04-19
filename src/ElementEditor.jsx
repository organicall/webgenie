import { useEffect, useState } from "react";

function ElementEditor({ element, onChange, onDelete }) {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(16);
  const [fontWeight, setFontWeight] = useState("normal");
  const [fontStyle, setFontStyle] = useState("normal");
  const [textDecoration, setTextDecoration] = useState("none");
  const [font, setFont] = useState("sans-serif");
  const [isTransparent, setIsTransparent] = useState(false);
  const [zIndex, setZIndex] = useState(1);

  useEffect(() => {
    if (element) {
      setContent(element.content || "");
      setImageUrl(element.imageUrl || "");
      setBgColor(element.bgColor || "#ffffff");
      setTextColor(element.textColor || "#000000");
      setFontSize(element.fontSize || 16);
      setFontWeight(element.fontWeight || "normal");
      setFontStyle(element.fontStyle || "normal");
      setTextDecoration(element.textDecoration || "none");
      setFont(element.font || "sans-serif");
      setIsTransparent(element.isTransparent || false);
      setZIndex(element.zIndex || 1);
    }
  }, [element.id]);

  useEffect(() => {
    onChange({
      content,
      imageUrl,
      bgColor,
      textColor,
      fontSize,
      fontWeight,
      fontStyle,
      textDecoration,
      font,
      isTransparent,
      zIndex,
    });
  }, [
    content,
    imageUrl,
    bgColor,
    textColor,
    fontSize,
    fontWeight,
    fontStyle,
    textDecoration,
    font,
    isTransparent,
    zIndex,
  ]);

  if (!element) return null;

  return (
    <div className="w-64 bg-white p-4 border-l space-y-3">
      <h3 className="text-lg font-bold">Editor</h3>

      {element.type === "Image" ? (
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full border px-2 py-1 rounded"
            placeholder="https://example.com/image.jpg"
          />
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium mb-1">Text</label>
          <textarea
            className="w-full border p-1"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      )}

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={isTransparent}
          onChange={(e) => setIsTransparent(e.target.checked)}
        />
        <span>Transparent Background</span>
      </label>

      <div>
        <label className="block text-sm">Font Size</label>
        <input
          type="number"
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
          className="w-full border p-1"
        />
      </div>

      <div>
        <label className="block text-sm">Font Family</label>
        <select
          value={font}
          onChange={(e) => setFont(e.target.value)}
          className="w-full border p-1"
        >
          <option value="sans-serif">Sans</option>
          <option value="serif">Serif</option>
          <option value="monospace">Monospace</option>
          <option value="arial">Arial</option>
          <option value="verdana">Verdana</option>
          <option value="courier">Courier</option>
          <option value="tahoma">Tahoma</option>
          <option value="georgia">Georgia</option>
          <option value="times">Times New Roman</option>
          <option value="impact">Impact</option>
          <option value="comic-sans-ms">Comic Sans MS</option>
          <option value="lato">Lato</option>
          <option value="roboto">Roboto</option>
          <option value="poppins">Poppins</option>
          <option value="Great Vibes">Spencerian (Great Vibes)</option>
          <option value="Loki Cola">Loki Cola</option>
        </select>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => setFontWeight(fontWeight === "bold" ? "normal" : "bold")}
          className={`border px-2 py-1 ${
            fontWeight === "bold" ? "bg-gray-300 font-bold" : ""
          }`}
        >
          B
        </button>
        <button
          onClick={() => setFontStyle(fontStyle === "italic" ? "normal" : "italic")}
          className={`border px-2 py-1 ${
            fontStyle === "italic" ? "bg-gray-300 italic" : ""
          }`}
        >
          I
        </button>
        <button
          onClick={() =>
            setTextDecoration(textDecoration === "underline" ? "none" : "underline")
          }
          className={`border px-2 py-1 ${
            textDecoration === "underline" ? "bg-gray-300 underline" : ""
          }`}
        >
          U
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <label className="text-sm">BG</label>
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          disabled={isTransparent}
        />
        <label className="text-sm">Text</label>
        <input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm">Layer (Z-Index)</label>
        <input
          type="number"
          value={zIndex}
          onChange={(e) => setZIndex(parseInt(e.target.value))}
          className="w-full border p-1"
        />
      </div>

      <button
        onClick={onDelete}
        className="w-full mt-4 py-2 bg-red-500 text-white rounded"
      >
        Delete Element
      </button>
    </div>
  );
}

export default ElementEditor;
