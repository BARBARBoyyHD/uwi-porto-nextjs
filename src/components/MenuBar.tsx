"use client"

import React from "react";
import {
  FaBold,
  FaHighlighter,
  FaItalic,
  FaStrikethrough,
} from "react-icons/fa";
import { Editor } from "@tiptap/react";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const option = [
    {
      label: "Bold",
      icon: <FaBold />,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      label: "Italic",
      icon: <FaItalic />,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
    },
    {
      label: "Strike",
      icon: <FaStrikethrough />,
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
    },
    {
      label: "Highlight",
      icon: <FaHighlighter />,
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: editor.isActive("highlight"),
    },
  ];

  return (
    <div className="border rounded-md p-1 mb-1 space-x-2 z-50">
      {option.map((item, index) => (
        <button
          key={index}
          type="button"
          onClick={item.action}
          className={`p-2 rounded ${
            item.isActive ? "bg-gray-200 text-black" : "text-gray-500"
          }`}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
}
