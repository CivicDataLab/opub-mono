import { CodeBlockProps as CBProps } from '@atlaskit/code';

export type CodeBlockProps = {
  // language of code. For theming
  language:
    | 'js'
    | 'jsx'
    | 'tsx'
    | 'ts'
    | 'sass'
    | 'css'
    | 'bash'
    | 'json'
    | 'xml'
    | 'coffeescript'
    | 'haskell'
    | 'graphql'
    | 'yaml'
    | 'text'
    | 'powershell'
    | 'rust'
    | 'diff'
    | 'html'
    | 'xml'
    | 'python'
    | 'csharp'
    | 'c#'
    | 'cpp'
    | 'ruby'
    | 'c'
    | 'r'
    | 'sql'
    | 'go'
    | 'java';
  // The code to be formatted
  text: string;
  // Comma delimited lines to highlight.
  highlight?: string;
  // Screen reader text for the start of a highlighted line.
  highlightedStartText?: string;
  // Screen reader text for the end of a highlighted line.
  highlightedEndText?: string;
  // Sets whether to display code line numbers or not
  showLineNumbers?: boolean;
  // Sets whether long lines will create a horizontally scrolling container
  shouldWrapLongLines?: boolean;
  // Whether to a collapsable button for the code block
  collapse?: boolean;
} & CBProps;
