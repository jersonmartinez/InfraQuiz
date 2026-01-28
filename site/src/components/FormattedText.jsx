import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const FormattedText = ({ text, className = "" }) => {
    if (!text) return null;

    // Clean up encoding issues
    const cleanText = text.replace(/[\u{FFFD}◆\u{25C6}\uD800-\uDFFF]/gu, '📝');

    // Split by code blocks (triple backticks)
    const blocks = cleanText.split(/(```[\s\S]*?```)/);

    return (
        <div className={className}>
            {blocks.map((block, i) => {
                if (block.startsWith('```') && block.endsWith('```')) {
                    const content = block.slice(3, -3).trim();
                    const lines = content.split('\n');
                    const firstLine = lines[0].trim();

                    // Simple language detection
                    const languages = ['bash', 'dockerfile', 'yaml', 'json', 'python', 'hcl', 'terraform', 'javascript'];
                    const lang = languages.includes(firstLine) ? firstLine : 'bash';
                    const code = languages.includes(firstLine) ? lines.slice(1).join('\n') : content;

                    return (
                        <div key={i} className="my-4 rounded-xl overflow-hidden text-sm border border-white/10 shadow-2xl">
                            <div className="bg-gray-800 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 flex justify-between items-center">
                                <span>{lang}</span>
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                                </div>
                            </div>
                            <SyntaxHighlighter
                                language={lang}
                                style={atomDark}
                                customStyle={{
                                    margin: 0,
                                    padding: '1.5rem',
                                    backgroundColor: 'transparent',
                                    fontSize: '0.875rem',
                                    lineHeight: '1.5',
                                }}
                                codeTagProps={{
                                    style: { fontFamily: 'JetBrains Mono, monospace' }
                                }}
                            >
                                {code}
                            </SyntaxHighlighter>
                        </div>
                    );
                }

                // For inline code and regular text
                return (
                    <span key={i}>
                        {block.split(/(`[^`]+`)/).map((part, j) => {
                            if (part.startsWith('`') && part.endsWith('`')) {
                                return (
                                    <code key={j} className="bg-blue-500/10 text-blue-500 dark:text-blue-400 px-1.5 py-0.5 rounded text-[0.9em] font-mono font-medium border border-blue-500/20 mx-0.5">
                                        {part.slice(1, -1)}
                                    </code>
                                );
                            }
                            return <span key={j}>{part}</span>;
                        })}
                    </span>
                );
            })}
        </div>
    );
};

export default FormattedText;
