"use client";

import React, { useState } from 'react';
import { IndentDecrease, IndentIncrease, Table as TableIcon } from 'lucide-react';

interface CellData {
  id: string;
  value: string;
  indent: number; // Represents levels (e.g., 1 level = 20px)
}

export default function ApexcelIndentPage() {
  const [cells, setCells] = useState<CellData[]>([
    { id: 'A1', value: 'Project Alpha', indent: 0 },
    { id: 'A2', value: 'Phase 1: Planning', indent: 1 },
    { id: 'A3', value: 'Risk Assessment', indent: 2 },
    { id: 'A4', value: 'Phase 2: Execution', indent: 1 },
  ]);

  const [selectedId, setSelectedId] = useState<string | null>('A1');

  // Logic to update indentation
  const updateIndent = (delta: number) => {
    setCells(prev => prev.map(cell => {
      if (cell.id === selectedId) {
        return { ...cell, indent: Math.max(0, cell.indent + delta) };
      }
      return cell;
    }));
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
        
        {/* Toolbar */}
        <div className="flex items-center gap-2 p-2 border-b border-gray-200 bg-gray-100">
          <div className="flex bg-white border border-gray-300 rounded-md">
            <button 
              onClick={() => updateIndent(-1)}
              className="p-2 hover:bg-gray-100 border-r border-gray-300"
              title="Decrease Indent"
            >
              <IndentDecrease size={18} />
            </button>
            <button 
              onClick={() => updateIndent(1)}
              className="p-2 hover:bg-gray-100"
              title="Increase Indent"
            >
              <IndentIncrease size={18} />
            </button>
          </div>
          <span className="text-xs text-gray-500 ml-2 font-medium">Alignment Options</span>
        </div>

        {/* Spreadsheet Grid */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left text-xs uppercase text-gray-400">
              <th className="w-12 border border-gray-200 p-2 text-center">#</th>
              <th className="border border-gray-200 p-2">Content</th>
            </tr>
          </thead>
          <tbody>
            {cells.map((cell) => (
              <tr 
                key={cell.id}
                onClick={() => setSelectedId(cell.id)}
                className={`cursor-pointer ${selectedId === cell.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
              >
                <td className="border border-gray-200 p-2 text-center text-sm text-gray-500 bg-gray-50">
                  {cell.id}
                </td>
                <td className="border border-gray-200 p-0">
                  <input
                    type="text"
                    value={cell.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCells(cells.map(c => c.id === cell.id ? {...c, value: val} : c));
                    }}
                    style={{ paddingLeft: `${cell.indent * 24 + 8}px` }}
                    className="w-full h-full p-2 bg-transparent focus:outline-2 focus:outline-blue-500 outline-offset-[-2px]"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <p className="mt-4 text-center text-sm text-gray-400">
        Click a cell and use the toolbar to adjust indentation.
      </p>
    </div>
  );
}