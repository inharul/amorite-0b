import React, { useRef, useEffect } from "react";
import { EditorView, keymap } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { minimalSetup } from "codemirror";
import { defaultKeymap } from "@codemirror/commands";
import { vim } from "@replit/codemirror-vim";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import {
  autocompletion,
  completionKeymap,
  CompletionContext,
} from "@codemirror/autocomplete";

const customCompletions = (context: CompletionContext) => {
  let word = context.matchBefore(/\w*/);
  if (!word) return null;
  if (word.from == word.to && !context.explicit) return null;

  return {
    from: word.from,
    options: [
      { label: "Alice", type: "constant" },
      { label: "Alexander", type: "constant" },
      { label: "Anna", type: "constant" },
      { label: "Bob", type: "constant" },
      { label: "Benjamin", type: "constant" },
      { label: "Bruce", type: "constant" },
      { label: "Charlie", type: "constant" },
      { label: "Charlotte", type: "constant" },
      { label: "Christopher", type: "constant" },
      { label: "David", type: "constant" },
      { label: "Daniel", type: "constant" },
      { label: "Diana", type: "character" },
      { label: "own", type: "constant" },
    ],
  };
};

const MyEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!editorRef.current) return;

    const startState = EditorState.create({
      doc: "Because _you_ need a place which...\n1. you can fully explore\n2. ...and **shape** on your ow",
      extensions: [
        minimalSetup,
        keymap.of([...defaultKeymap, ...completionKeymap]),
        vim(),
        EditorView.lineWrapping,
        EditorState.allowMultipleSelections.of(false),
        markdown({
          base: markdownLanguage,
          codeLanguages: [],
        }),
        autocompletion({
          override: [customCompletions],
        }),
        EditorView.theme(
          {
            "&": {
              height: "100%",
              outline: "none !important",
              caretColor: "white",
              fontSize: "18px",
            },
            "&.cm-focused .cm-cursor": {
              borderLeftColor: "white !important",
            },
            "&.cm-vim-insert .cm-cursor": {
              borderLeftColor: "white !important",
              borderLeftWidth: "2px",
            },
            ".cm-vim-panel": {
              color: "white !important",
              background: "white !important",
            },
            ".cm-fat-cursor": {
              background: "white !important",
              color: "black !important",
              opacity: "0.7 !important",
            },
            ".cm-scroller": {
              height: "100% !important",
            },
            ".cm-content, .cm-line, .cm-textfield": {
              fontFamily: "inherit !important",
              fontSize: "18px !important",
            },
            ".cm-focused": {
              border: "none",
              outline: "none !important",
            },
            ".cm-editor": {
              outline: "none !important",
            },
            ".cm-editor.cm-focused": {
              outline: "none !important",
            },
            ".cm-selectionBackground": {
              background: "rgba(255, 255, 255, 0.2) !important",
            },
            ".cm-focused .cm-selectionBackground": {
              background: "rgba(255, 255, 255, 0.3) !important",
            },
            ".cm-header-mark": {
              display: "none",
            },
            ".cm-formatting": {
              display: "none",
            },
            ".cm-formatting-list": { display: "none" },
            ".cm-formatting-quote": { display: "none" },
            ".cm-formatting-strong": { display: "none" },
            ".cm-formatting-em": { display: "none" },
            ".cm-formatting-link": { display: "none" },
          },
          { dark: true }
        ),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });

    return () => {
      view.destroy();
    };
  }, []);

  return (
    <div
      ref={editorRef}
      className="h-full"
      style={{ fontFamily: "Arial" }}
    ></div>
  );
};

export default MyEditor;
