import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "./ResumePDF";
import { ResumeData } from "../types/resume";

interface PDFPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeData: ResumeData;
}

const PDFPreviewModal = ({
  isOpen,
  onClose,
  resumeData,
}: PDFPreviewModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Preview & Download PDF</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex-1 p-4 flex flex-col">
          <PDFViewer
            width="100%"
            height="100%"
            className="flex-1 border rounded mb-4"
          >
            <ResumePDF resumeData={resumeData} />
          </PDFViewer>
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <PDFDownloadLink
              document={<ResumePDF resumeData={resumeData} />}
              fileName="resume.pdf"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 
                transition-all duration-200 flex items-center gap-2"
            >
              {({ loading }) => (
                <>
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
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  {loading ? "Preparing Download..." : "Download PDF"}
                </>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFPreviewModal;
