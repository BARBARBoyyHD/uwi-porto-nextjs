// src/components/editor/plugins/on-change-plugin.tsx

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, EditorState } from "lexical";
import { useEffect } from "react";
import { $convertToMarkdownString } from '@lexical/markdown'; // If you prefer Markdown
import { $generateHtmlFromNodes } from '@lexical/html'; // If you prefer HTML

interface OnChangePluginProps {
  // Define the prop the parent component will use to receive the content
  onChange: (htmlContent: string) => void; 
}

// NOTE: You might need to install the necessary Lexical packages for HTML/Markdown export.
// e.g., npm install @lexical/html @lexical/markdown

export function OnChangePlugin({ onChange }: OnChangePluginProps) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Register a listener for changes to the editor state
    return editor.registerUpdateListener(({ editorState, dirtyElements, dirtyLeaves }) => {
      // Execute the provided function after the editor state update is done
      editorState.read(() => {
        // Option 1: Export as HTML (Recommended for most backends/databases)
        const htmlString = $generateHtmlFromNodes(editor, null); 
        
        // Option 2: Export as plain text
        // const plainText = $getRoot().getTextContent();

        // Option 3: Export as Lexical JSON state (useful for rehydrating the editor later)
        // const jsonState = JSON.stringify(editorState.toJSON());

        // Call the parent's onChange handler with the content
        onChange(htmlString);
      });
    });
  }, [editor, onChange]);

  return null; // Plugins don't render anything
}