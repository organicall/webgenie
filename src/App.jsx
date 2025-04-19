
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Toolbox from "./Toolbox";
import Canvas from "./Canvas";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-screen">
        {/* Canvas Area (takes all available vertical space) */}
        <div className="flex-grow overflow-hidden">
          <Canvas />
        </div>

        {/* Toolbox (fixed height at the bottom) */}
        <div className="h-24 bg-gray-200 border-t border-gray-300 shawdow-inner">
          <Toolbox />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
