// src/Toolbox.jsx
import { useDrag } from "react-dnd";

const ToolboxItem = ({ type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "toolbox-item",
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`px-4 py-2 border rounded-md cursor-move bg-white hover:bg-gray-50 
        shadow-sm transition-colors ${isDragging ? "opacity-50" : ""}`}
    >
      {type}
    </div>
  );
};

function Toolbox() {
  return (
    <div className="flex items-center justify-center h-full px-4">
      <div className="flex space-x-6">
        <ToolboxItem type="Text" />
        <ToolboxItem type="Image" />
        <ToolboxItem type="Button" />
      </div>
    </div>
  );
}

export default Toolbox;
