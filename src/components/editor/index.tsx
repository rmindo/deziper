import "@src/assets/sass/editor.css";

import React from 'react'
import {$getRoot, $getSelection} from 'lexical'
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";

import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";

import {$generateHtmlFromNodes} from '@lexical/html'


import config from './config'


function Save({content}: {content: Function}) {
  const [editor]: any = useLexicalComposerContext();

  React.useEffect(() => {
    const removeUpdateListener = editor.registerUpdateListener(() => {
      const editorState = editor.getEditorState()

      const parsed = editor.parseEditorState(JSON.stringify(editorState.toJSON()))

      parsed.read(() => {
        return $getRoot().getTextContent()
      })

      editorState.read(() => {
        const htmlString = $generateHtmlFromNodes(editor, null)

        content(htmlString)
      });
    })
    return () => {
      removeUpdateListener()
    };
  }, [editor]);


  return null
}

function contentState() {
  const value = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"What can be built with Lexical?","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Lexical makes it possible to easily create complex text editing experiences that otherwise would be very complex with the built-in browser tooling. We built Lexical to enable developers to move-fast and create different types of text experiences that scale to specific requirements. Here are some (but not all) examples of what you can do with Lexical:","type":"text","version":1}],"direction":"ltr","format":"start","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Simple plain-text editors that have more requirements than a","type":"text","version":1},{"detail":0,"format":16,"mode":"normal","style":"","text":"<textarea>","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"such as requiring features like mentions, custom emojis, links, and hashtags.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"More complex rich-text editors that can be used to post content on blogs, social media, and messaging applications.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":2},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"A full-blown WYSIWYG editor that can be used in a CMS or rich content editor.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":3},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Real-time collaborative text editing experiences that combine many of the above points.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":4}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"You can think of Lexical as a text editor UI framework. Whilst Lexical is currently only usable on the web, the team is also experimenting with building native versions of Lexical for other platforms. At Meta, Lexical powers web text editing experiences for hundreds of millions of users everyday across Facebook, Workplace, Messenger, WhatsApp and Instagram.","type":"text","version":1}],"direction":"ltr","format":"start","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}';

  return value
}


const initialConfig: any = {
  onError(error: any) {
    throw error
  },
  theme: config.theme,
  nodes: config.nodes,
  editorState: contentState(),
}

export default function Editor({content}: {content: Function}) {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ToolbarPlugin />
      <div className="editor-inner">
        <RichTextPlugin
          placeholder={
            <div className="editor-placeholder">Enter rich text...</div>
          }
          ErrorBoundary={LexicalErrorBoundary}
          contentEditable={<ContentEditable className="editor-input" />}
        />
        <Save content={content}/>
        <HistoryPlugin />
        <AutoFocusPlugin />
        <CodeHighlightPlugin />
        <ListPlugin />
        <LinkPlugin />
        <AutoLinkPlugin />
        <ListMaxIndentLevelPlugin maxDepth={7}/>
        <MarkdownShortcutPlugin transformers={TRANSFORMERS}/>
      </div>
    </LexicalComposer>
  );
}
