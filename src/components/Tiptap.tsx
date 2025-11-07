"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import MenuBar from "./MenuBar";

interface TipTapProps {
  onChange: (html: string) => void;
}

const TipTap = ({ onChange }: TipTapProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Highlight],
    content: "Start Typing...",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] border p-2 rounded-md w-full max-w-full focus:outline-none resize-none",
      },
    },
    immediatelyRender: false,
  });

  return (
    <div
      className="w-full max-w-2xl mx-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTap;
