import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import './ResumeEditor.css';

interface WYSIWYGEditorProps {
  content: string;
  onChange: (content: string) => void;
  selectedTemplate: string;
}

export default function WYSIWYGEditor({ content, onChange, selectedTemplate }: WYSIWYGEditorProps) {
  const getEditorClasses = (template: string) => {
    const baseClasses = 'resume-editor focus:outline-none';
    
    let result;
    switch (template) {
      case 'professional':
        result = `${baseClasses} professional`;
        break;
      case 'creative':
        result = `${baseClasses} creative`;
        break;
      default: // minimal
        result = `${baseClasses} minimal`;
        break;
    }
    
    console.log('🎨 WYSIWYG Editor Classes:', {
      template,
      baseClasses,
      result,
      windowWidth: window.innerWidth
    });
    
    return result;
  };

  const getToolbarClasses = (template: string) => {
    switch (template) {
      case 'professional':
        return 'bg-gray-100 border-gray-300';
      case 'creative':
        return 'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200';
      default: // minimal
        return 'bg-gray-50 border-gray-200';
    }
  };

  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: getEditorClasses(selectedTemplate),
        placeholder: 'Start typing your resume...'
      }
    }
  });

  // Update editor content when prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  // Apply template-specific styling
  useEffect(() => {
    if (editor) {
      editor.setOptions({
        editorProps: {
          attributes: {
            class: getEditorClasses(selectedTemplate),
            placeholder: 'Start typing your resume...'
          }
        }
      });
      
      // Debug: Check actual DOM element
      setTimeout(() => {
        const editorElement = editor.view.dom;
        console.log('🔍 TipTap Editor DOM Element:', {
          element: editorElement,
          computedWidth: window.getComputedStyle(editorElement).width,
          computedMaxWidth: window.getComputedStyle(editorElement).maxWidth,
          offsetWidth: editorElement.offsetWidth,
          clientWidth: editorElement.clientWidth,
          scrollWidth: editorElement.scrollWidth,
          classes: editorElement.className
        });
      }, 100);
    }
  }, [editor, selectedTemplate]);

  if (!editor) {
    return null;
  }

  console.log('🔧 WYSIWYGEditor render - Wrapper div classes:', 'w-full');
  
  return (
    <div className="w-full max-w-4xl mx-auto" ref={(el) => {
      if (el) {
        console.log('🔍 Wrapper div DOM:', {
          element: el,
          computedWidth: window.getComputedStyle(el).width,
          offsetWidth: el.offsetWidth,
          clientWidth: el.clientWidth,
          parentElement: el.parentElement,
          parentComputedWidth: el.parentElement ? window.getComputedStyle(el.parentElement).width : 'no parent'
        });
      }
    }}>
      {/* Floating Toolbar */}
      <div className={`sticky top-0 z-10 ${getToolbarClasses(selectedTemplate)} border-b p-3 rounded-t-lg`}>
        <div className="flex flex-wrap items-center gap-2 w-full">
          {/* Text Formatting */}
          <div className="flex items-center gap-1 border-r border-gray-300 pr-2 mr-2">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`px-3 py-1.5 text-sm rounded hover:bg-white hover:bg-opacity-50 transition-colors ${
                editor.isActive('bold') ? 'bg-white bg-opacity-50 text-gray-800' : 'text-gray-600'
              }`}
              title="Bold"
            >
              <strong>B</strong>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`px-3 py-1.5 text-sm rounded hover:bg-white hover:bg-opacity-50 transition-colors ${
                editor.isActive('italic') ? 'bg-white bg-opacity-50 text-gray-800' : 'text-gray-600'
              }`}
              title="Italic"
            >
              <em>I</em>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`px-3 py-1.5 text-sm rounded hover:bg-white hover:bg-opacity-50 transition-colors ${
                editor.isActive('strike') ? 'bg-white bg-opacity-50 text-gray-800' : 'text-gray-600'
              }`}
              title="Strikethrough"
            >
              <s>S</s>
            </button>
          </div>

          {/* Headings */}
          <div className="flex items-center gap-1 border-r border-gray-300 pr-2 mr-2">
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`px-3 py-1.5 text-sm rounded hover:bg-white hover:bg-opacity-50 transition-colors ${
                editor.isActive('heading', { level: 1 }) ? 'bg-white bg-opacity-50 text-gray-800' : 'text-gray-600'
              }`}
              title="Heading 1"
            >
              H1
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`px-3 py-1.5 text-sm rounded hover:bg-white hover:bg-opacity-50 transition-colors ${
                editor.isActive('heading', { level: 2 }) ? 'bg-white bg-opacity-50 text-gray-800' : 'text-gray-600'
              }`}
              title="Heading 2"
            >
              H2
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={`px-3 py-1.5 text-sm rounded hover:bg-white hover:bg-opacity-50 transition-colors ${
                editor.isActive('heading', { level: 3 }) ? 'bg-white bg-opacity-50 text-gray-800' : 'text-gray-600'
              }`}
              title="Heading 3"
            >
              H3
            </button>
          </div>

          {/* Lists */}
          <div className="flex items-center gap-1 border-r border-gray-300 pr-2 mr-2">
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`px-3 py-1.5 text-sm rounded hover:bg-white hover:bg-opacity-50 transition-colors ${
                editor.isActive('bulletList') ? 'bg-white bg-opacity-50 text-gray-800' : 'text-gray-600'
              }`}
              title="Bullet List"
            >
              •
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`px-3 py-1.5 text-sm rounded hover:bg-white hover:bg-opacity-50 transition-colors ${
                editor.isActive('orderedList') ? 'bg-white bg-opacity-50 text-gray-800' : 'text-gray-600'
              }`}
              title="Numbered List"
            >
              1.
            </button>
          </div>

          {/* Other */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`px-3 py-1.5 text-sm rounded hover:bg-white hover:bg-opacity-50 transition-colors ${
                editor.isActive('codeBlock') ? 'bg-white bg-opacity-50 text-gray-800' : 'text-gray-600'
              }`}
              title="Code Block"
            >
              {'</>'}
            </button>
            <button
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              className="px-3 py-1.5 text-sm rounded hover:bg-white hover:bg-opacity-50 transition-colors text-gray-600"
              title="Horizontal Rule"
            >
              —
            </button>
          </div>
        </div>
      </div>
      
      {/* Unified Editor/Preview */}
      <div className="w-full">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}