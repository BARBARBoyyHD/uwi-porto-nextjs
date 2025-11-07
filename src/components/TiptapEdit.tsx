"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import MenuBar from "./MenuBar";

interface TipTapEditProps {
  value?: string;
  onChange: (html: string) => void;
}

const TipTapEdit = ({ value, onChange }: TipTapEditProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Highlight],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "h-[300px] border p-2 rounded-md",
      },
    },
    immediatelyRender: false,
  });

  // 🧩 Sync content when "value" changes (e.g., fetched from API)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  return (
    <div className="w-full max-w-full" onClick={(e) => e.stopPropagation()}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTapEdit;
