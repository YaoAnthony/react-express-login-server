import React, { useMemo } from "react";
import { ProjectFile } from "../Types/Project";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

/**
 * Try to parse and prettify JSON, otherwise return original string.
 * This is only used for .json or untyped content fallback.
 */
function formatContent(content: string): string {
  try {
    const parsed = JSON.parse(content);
    return JSON.stringify(parsed, null, 2);
  } catch {
    return content;
  }
}

interface FileViewerProps {
  file: ProjectFile | null;
}

const FileViewer: React.FC<FileViewerProps> = ({ file }) => {
  const content = useMemo(() => {
    if (!file?.content) return "";
    return formatContent(file.content);
  }, [file]);

  const language = useMemo(() => {
    if (!file?.filename) return "text";
    if (file.filename.endsWith(".py")) return "python";
    if (file.filename.endsWith(".ts")) return "typescript";
    if (file.filename.endsWith(".js")) return "javascript";
    if (file.filename.endsWith(".json")) return "json";
    if (file.filename.endsWith(".md")) return "markdown";
    return "text";
  }, [file]);

  if (!file) {
    return <p className="text-gray-400">Select a file to view content.</p>;
  }

  return (
    <div>
      <h2 className="text-xl text-gray-500 mb-4">
        File: <span className="font-mono">{file.filename}</span>
      </h2>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        wrapLongLines
        customStyle={{
          borderRadius: "0.5rem",
          padding: "1rem",
          fontSize: "1rem",
        }}
      >
        {content}
      </SyntaxHighlighter>
    </div>
  );
};

export default FileViewer;
