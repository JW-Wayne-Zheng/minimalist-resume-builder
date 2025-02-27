import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="border rounded-lg p-2">
      <div className="mb-2 flex gap-2">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className="p-1 border rounded hover:bg-gray-100"
        >
          Bold
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className="p-1 border rounded hover:bg-gray-100"
        >
          Italic
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}