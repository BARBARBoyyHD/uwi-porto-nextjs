"use client";

import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateNodesFromDOM } from "@lexical/html";
import { $getRoot, $createParagraphNode, $createTextNode } from "lexical";

interface InitialHtmlPluginProps {
  initialHtml: string;
}

export function InitialHtmlPlugin({ initialHtml }: InitialHtmlPluginProps) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!initialHtml) return;

    // Use a Lexical update function to modify the editor state
    editor.update(() => {
      // 1. Create a DOMParser to parse the HTML string
      const parser = new DOMParser();
      const dom = parser.parseFromString(initialHtml, "text/html");

      // 2. Convert the DOM structure into Lexical nodes
      // NOTE: Make sure all necessary nodes (e.g., HeadingNode, QuoteNode) are registered in editorConfig!
      const nodes = $generateNodesFromDOM(editor, dom);

      // 3. Get the root node and clear its contents
      const root = $getRoot();
      root.clear();

      if (nodes.length > 0) {
        // 4. Append the generated nodes to the root
        root.append(...nodes);
      } else {
        // Fallback for empty or unparseable content (add a basic paragraph)
        root.append($createParagraphNode());
      }
    });
  }, [editor, initialHtml]); // IMPORTANT: The dependency array should only contain 'editor' if you only want to load it once.
  // If 'initialHtml' can change, you might need a different state management approach, but for *initial* load, 'editor' is best.

  return null;
}
