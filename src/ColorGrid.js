import React, { useState } from "react";
import "./ColorGrid.css"; 

const rainbowColors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "violet",
  "pink",
  "brown",
  "gray",
];

const numRows = 10;
const numCols = 10;

const ColorGrid = () => {
  const initialGrid = Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () =>
      rainbowColors[Math.floor(Math.random() * rainbowColors.length)]
    )
  );

  const [grid, setGrid] = useState(initialGrid);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorOptionClick = (color) => {
    setSelectedColor(color);
  };

  const handleCellClick = (rowIndex, cellIndex) => {
    if (selectedColor === null) return; 
  
    const targetColor = grid[rowIndex][cellIndex];
  
    if (targetColor === selectedColor) return; 
  
    const updateGrid = (grid, rowIndex, cellIndex) => {
      if (
        rowIndex < 0 ||
        rowIndex >= numRows ||
        cellIndex < 0 ||
        cellIndex >= numCols
      ) {
        return;
      }
  
      if (grid[rowIndex][cellIndex] !== targetColor) {
        return;
      }
  
      grid[rowIndex][cellIndex] = selectedColor;
  
      updateGrid(grid, rowIndex + 1, cellIndex);
      updateGrid(grid, rowIndex - 1, cellIndex);
      updateGrid(grid, rowIndex, cellIndex + 1);
      updateGrid(grid, rowIndex, cellIndex - 1);
    };
  
    const newGrid = [...grid];
    updateGrid(newGrid, rowIndex, cellIndex);
    setGrid(newGrid);
  
    alert(`Row: ${rowIndex}, Cell: ${cellIndex}`);
  };
  

  return (
    <div>
      <h1>Available Colors</h1>
      <div className="color-options">
        {rainbowColors.map((color, index) => (
          <div
            key={index}
            className={`color-option ${
              selectedColor === color ? "selected" : ""
            }`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorOptionClick(color)}
          ></div>
        ))}
      </div>
      <h1>Color Grid</h1>
      <table className="color-grid">
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cellColor, cellIndex) => (
                <td
                  key={cellIndex}
                  style={{ backgroundColor: cellColor }}
                  onClick={() => handleCellClick(rowIndex, cellIndex)}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ColorGrid;
