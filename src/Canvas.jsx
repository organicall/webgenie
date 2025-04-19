import { useDrop } from "react-dnd";
import { useState } from "react";
import { Rnd } from "react-rnd";
import ElementEditor from "./ElementEditor";

function Canvas() {
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showBgSettings, setShowBgSettings] = useState(true);

  const [background, setBackground] = useState({
    type: "color",
    value: "#ffffff",
  });

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "toolbox-item",
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const canvasRect = document
        .getElementById("canvas-area")
        .getBoundingClientRect();
      const x = offset.x - canvasRect.left;
      const y = offset.y - canvasRect.top;

      setElements((prev) => [
        ...prev,
        {
          ...item,
          id: Date.now(),
          x,
          y,
          width: 200,
          height: 100,
          content: item.type === "Button" ? "Click Me" : "Edit me",
          bgColor: "#ffffff",
          textColor: "#000000",
          fontSize: 16,
          fontWeight: "normal",
          fontStyle: "normal",
          textDecoration: "none",
          font: "sans-serif",
          imageUrl: "https://via.placeholder.com/150",
          zIndex: prev.length + 1,
          isTransparent: false, // <-- added default transparent flag
        },
      ]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const deleteElement = (id) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const updateElement = (id, data) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...data } : el))
    );
  };

  const canvasStyle = {
    position: "relative",
    flex: 1,
    border: "1px solid #ccc",
    overflow: "hidden",
    ...(background.type === "color"
      ? { backgroundColor: background.value }
      : {
          backgroundImage: `url(${background.value})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }),
  };

  return (
    <div className="flex h-screen">
      {/* Canvas Area */}
      <div id="canvas-area" ref={drop} style={canvasStyle}>
        {elements.map((el) => (
          <CanvasElement
            key={el.id}
            element={el}
            onUpdate={updateElement}
            onSelect={() => setSelectedId(el.id)}
            isSelected={el.id === selectedId}
          />
        ))}
      </div>

      {/* Editor Sidebar */}
      {selectedId && (
        <ElementEditor
          element={elements.find((el) => el.id === selectedId)}
          onChange={(data) => updateElement(selectedId, data)}
          onDelete={() => deleteElement(selectedId)}
        />
      )}

      {/* Collapsible Background Settings Panel */}
      <div
        className={`transition-all duration-300 bg-gray-100 border-l ${
          showBgSettings ? "w-64 p-4" : "w-10 p-1"
        } overflow-hidden`}
      >
        <button
          className="text-xs text-blue-600 underline mb-2"
          onClick={() => setShowBgSettings(!showBgSettings)}
        >
          {showBgSettings ? "Hide" : "Show"}
        </button>

        {showBgSettings && (
          <>
            <h3 className="font-bold mb-2">Background</h3>
            <select
              className="w-full p-1 border mb-2"
              value={background.type}
              onChange={(e) =>
                setBackground((prev) => ({
                  ...prev,
                  type: e.target.value,
                }))
              }
            >
              <option value="color">Color</option>
              <option value="image">Image</option>
            </select>

            {background.type === "color" ? (
              <input
                type="color"
                className="w-full"
                value={background.value}
                onChange={(e) =>
                  setBackground((prev) => ({
                    ...prev,
                    value: e.target.value,
                  }))
                }
              />
            ) : (
              <input
                type="text"
                placeholder="Enter image or GIF URL"
                className="w-full border p-1"
                value={background.value}
                onChange={(e) =>
                  setBackground((prev) => ({
                    ...prev,
                    value: e.target.value,
                  }))
                }
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

function CanvasElement({ element, onUpdate, onSelect, isSelected }) {
  return (
    <Rnd
      size={{ width: element.width, height: element.height }}
      position={{ x: element.x, y: element.y }}
      bounds="parent"
      onDragStop={(e, d) => onUpdate(element.id, { x: d.x, y: d.y })}
      onResizeStop={(e, dir, ref, delta, pos) =>
        onUpdate(element.id, {
          width: ref.offsetWidth,
          height: ref.offsetHeight,
          ...pos,
        })
      }
      style={{ zIndex: element.zIndex, position: "absolute" }}
      onClick={onSelect}
    >
      <div
        className={`w-full h-full p-2 rounded shadow overflow-hidden ${
          isSelected ? "ring-2 ring-blue-500" : ""
        }`}
        style={{
          backgroundColor: element.isTransparent ? "transparent" : element.bgColor,
          color: element.textColor,
          fontSize: `${element.fontSize}px`,
          fontWeight: element.fontWeight,
          fontStyle: element.fontStyle,
          textDecoration: element.textDecoration,
          fontFamily: element.font,
        }}
      >
        {element.type === "Image" ? (
          <img
            src={element.imageUrl}
            alt="Dropped"
            className="w-full h-full object-cover"
          />
        ) : element.type === "Button" ? (
          <button className="w-full h-full">{element.content}</button>
        ) : (
          element.content
        )}
      </div>
    </Rnd>
  );
}

export default Canvas;
