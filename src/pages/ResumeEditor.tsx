import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ResumeForm from '../ResumeForm';
import ResumePreview from '../ResumePreview';
import { exportFormats, downloadFile } from '../utils/exportUtils';
import { analyzeResume, ResumeScore } from '../utils/resumeAnalytics';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import PDFPreviewModal from '../components/PDFPreviewModal';

const saveStatusDisplay = {
  saved: "✓ All changes saved",
  saving: "Saving...",
  error: "⚠️ Error saving changes",
};

export default function ResumeEditor() {
  const navigate = useNavigate();
  const [selectedTemplate] = useState(() => {
    return localStorage.getItem('selectedTemplate') || 'minimal';
  });

  const [resumeData, setResumeData] = useState(() => {
    const savedData = localStorage.getItem("resumeData");
    return savedData
      ? JSON.parse(savedData)
      : {
          name: "",
          email: "",
          phone: "",
          education: "",
          experience: "",
          skills: "",
        };
  });

  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "error">("saved");
  const [isPDFPreviewOpen, setIsPDFPreviewOpen] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout>(null);

  // Save to localStorage whenever resumeData changes
  useEffect(() => {
    setSaveStatus("saving");

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem("resumeData", JSON.stringify(resumeData));
        setSaveStatus("saved");
      } catch (error) {
        setSaveStatus("error");
      }
    }, 1000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [resumeData]);

  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    return (
      <button
        onClick={() => setIsPDFPreviewOpen(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 
        transition-all duration-200 ease-in-out transform hover:scale-105 flex items-center gap-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
        Export as PDF
      </button>
    );
  };

  const handleExport = (format: "json" | "txt") => {
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
      key: "s",
      ctrlKey: true,
      action: () => handleDownloadPDF(),
    },
    {
      key: "e",
      ctrlKey: true,
      action: () => handleExport("json"),
    },
  ]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/templates')}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Templates
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">
                Resume Editor
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 ${
                    saveStatus === "saved"
                      ? "text-green-600"
                      : saveStatus === "saving"
                      ? "text-blue-600"
                      : "text-red-600"
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-current"></div>
                  {saveStatusDisplay[saveStatus]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        {/* Resume Score */}
        {resumeScore && (
          <div className="mb-6">
            <div className="bg-white rounded-lg p-4 shadow-lg border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Resume Score
                  </h3>
                  <div className="text-sm text-gray-500">
                    Based on content completeness
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(resumeScore.total)}%
                </div>
              </div>
              <div className="mt-2 space-y-1">
                {resumeScore.suggestions.map((suggestion, index) => (
                  <p
                    key={index}
                    className="text-sm text-gray-600 flex items-start gap-2"
                  >
                    <span className="text-blue-500">•</span>
                    {suggestion}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Editor Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 mb-6">
          <div className="min-h-[600px]">
            <ResumeForm setResumeData={setResumeData} resumeData={resumeData} />
          </div>
          <div ref={resumeRef} className="min-h-[600px]">
            <ResumePreview resumeData={resumeData} selectedTemplate={selectedTemplate} />
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex flex-wrap justify-center gap-3 py-4">
          {handleDownloadPDF()}
          <button
            onClick={() => handleExport("json")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Export JSON
          </button>
          <button
            onClick={() => handleExport("txt")}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition"
          >
            Export TXT
          </button>
        </div>
      </div>

      <PDFPreviewModal
        isOpen={isPDFPreviewOpen}
        onClose={() => setIsPDFPreviewOpen(false)}
        resumeData={resumeData}
      />
    </div>
  );
}
