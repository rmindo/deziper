import theme from './themes/toolbar'

import {AutoLinkNode, LinkNode} from '@lexical/link'
import {ListItemNode, ListNode} from '@lexical/list'
import {HeadingNode, QuoteNode} from '@lexical/rich-text'
import {CodeHighlightNode, CodeNode} from '@lexical/code'
import {TableCellNode, TableNode, TableRowNode} from '@lexical/table'


export default {
  theme,
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode
  ]
}