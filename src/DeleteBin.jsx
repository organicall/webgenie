// src/DeleteBin.jsx
import { useDrop } from "react-dnd";

function DeleteBin({ onDrop }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "canvas-element",
    drop: (item) => {
      onDrop(item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  
}

export default DeleteBin;
