import { useState, useEffect, useRef } from "react";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import { useReactToPrint } from "react-to-print";
import { exportFormats, downloadFile } from './utils/exportUtils';
import { analyzeResume, ResumeScore } from './utils/resumeAnalytics';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

const saveStatusDisplay = {
  saved: '✓ All changes saved',
  saving: 'Saving...',
  error: '⚠️ Error saving changes'
};

export default function App() {
  const [resumeData, setResumeData] = useState(() => {
    const savedData = localStorage.getItem('resumeData');
    return savedData ? JSON.parse(savedData) : {
      name: "",
      email: "",
      phone: "",
      education: "",
      experience: "",
      skills: "",
    };
  });

  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');
  const saveTimeoutRef = useRef<NodeJS.Timeout>(null);

  // Save to localStorage whenever resumeData changes
  useEffect(() => {
    setSaveStatus('saving');

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem('resumeData', JSON.stringify(resumeData));
        setSaveStatus('saved');
      } catch (error) {
        setSaveStatus('error');
      }
    }, 1000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [resumeData]);

  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: "Resume",
    onAfterPrint: () => console.log("PDF downloaded successfully!"),
  });

  const handleExport = (format: 'json' | 'txt') => {
    const url = exportFormats[format](resumeData);
    downloadFile(url, `resume.${format}`);
  };

  const [resumeScore, setResumeScore] = useState<ResumeScore | null>(null);

  useEffect(() => {
    const score = analyzeResume(resumeData);
    setResumeScore(score);
  }, [resumeData]);

  useKeyboardShortcuts([
    {
      key: 's',
      ctrlKey: true,
      action: () => handleDownloadPDF()
    },
    {
      key: 'e',
      ctrlKey: true,
      action: () => handleExport('json')
    }
  ]);

  // Add shortcut info to the UI
  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-4 text-black">
        Minimalist Resume Builder
      </h1>
      <div className="text-sm text-gray-500 mt-2">
        {saveStatusDisplay[saveStatus]}
      </div>

      {resumeScore && (
        <div className="w-full max-w-4xl px-6 mt-4">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold">Resume Score: {Math.round(resumeScore.total)}%</h3>
            <div className="mt-2">
              {resumeScore.suggestions.map((suggestion, index) => (
                <p key={index} className="text-sm text-gray-600">• {suggestion}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <ResumeForm setResumeData={setResumeData} resumeData={resumeData} />
        <div ref={resumeRef} className="w-full h-full">
          <ResumePreview resumeData={resumeData} />
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => handleDownloadPDF()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Download as PDF
        </button>
        <button
          onClick={() => handleExport('json')}
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition"
        >
          Export JSON
        </button>
        <button
          onClick={() => handleExport('txt')}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition"
        >
          Export TXT
        </button>
      </div>
    </div>
  );
}
