import '@src/assets/sass/editor.css'

import config from './config'

import {TRANSFORMERS} from '@lexical/markdown'
import {ListPlugin} from '@lexical/react/LexicalListPlugin'
import {LinkPlugin} from '@lexical/react/LexicalLinkPlugin'
import {LexicalComposer} from '@lexical/react/LexicalComposer'
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin'
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin'
import {ContentEditable} from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import {MarkdownShortcutPlugin} from '@lexical/react/LexicalMarkdownShortcutPlugin'


import ToolbarPlugin from './plugins/ToolbarPlugin'
import AutoLinkPlugin from './plugins/AutoLinkPlugin'
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin'
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin'
import {EditorContentProps, EditorContentPlugin} from './plugins/EditorContentPlugin'


const initialConfig: any = {
  onError(error: any) {
    throw error
  },
  theme: config.theme,
  nodes: config.nodes
}

export default function Editor({initialTitle, initialContent, onContentChange}: EditorContentProps) {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ToolbarPlugin />
      <div className="editor-inner">
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="editor-input" />
          }
          placeholder={() => {
            return <p className="editor-placeholder">Start with a title</p>
          }}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <EditorContentPlugin
          initialTitle={initialTitle}
          initialContent={initialContent}
          onContentChange={onContentChange}
        />
        <ListPlugin />
        <LinkPlugin />
        <HistoryPlugin />
        <AutoLinkPlugin />
        <CodeHighlightPlugin />
        <ListMaxIndentLevelPlugin maxDepth={7}/>
        <MarkdownShortcutPlugin transformers={TRANSFORMERS}/>
      </div>
    </LexicalComposer>
  )
}
