import { useState, useEffect, useRef } from "react";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import { useReactToPrint } from "react-to-print";

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

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-4 text-black">
        Minimalist Resume Builder
      </h1>
      <div className="text-sm text-gray-500 mt-2">
        {saveStatusDisplay[saveStatus]}
      </div>

      <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <ResumeForm setResumeData={setResumeData} />
        <div ref={resumeRef} className="w-full h-full">
          <ResumePreview resumeData={resumeData} />
        </div>
      </div>
      <button
        onClick={() => handleDownloadPDF()}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition mt-4"
      >
        Download as PDF
      </button>
    </div>
  );
}
