import "./App.css";
import { ResumeData } from "./types/resume";

interface ResumePreviewProps {
  resumeData: ResumeData;
  selectedTemplate?: string;
  htmlContent?: string;
}

export default function ResumePreview({ resumeData, selectedTemplate = 'minimal', htmlContent }: ResumePreviewProps) {
  const getTemplateStyles = () => {
    switch (selectedTemplate) {
      case 'professional':
        return {
          container: 'font-serif',
          header: 'flex justify-between items-start pb-4 border-b border-gray-300 mb-6',
          name: 'text-2xl font-bold text-gray-900 mb-2',
          contact: 'text-sm text-gray-600 space-y-1',
          section: 'mb-6',
          sectionTitle: 'text-lg font-bold text-gray-800 mb-3 border-b border-gray-200 pb-1',
          content: 'text-sm text-gray-700 leading-relaxed'
        };
      case 'creative':
        return {
          container: 'font-sans',
          header: 'text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg mb-6',
          name: 'text-3xl font-bold mb-2',
          contact: 'text-blue-100 space-y-1',
          section: 'mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500',
          sectionTitle: 'text-lg font-semibold text-blue-600 mb-3 uppercase tracking-wide',
          content: 'text-sm text-gray-700 leading-relaxed'
        };
      default: // minimal
        return {
          container: 'font-sans',
          header: 'text-center pb-6 border-b-2 border-gray-200 mb-8',
          name: 'text-3xl font-bold text-gray-900 mb-2',
          contact: 'text-gray-600 space-y-1',
          section: 'mb-8',
          sectionTitle: 'text-xl font-semibold text-gray-800 mb-4 uppercase tracking-wide',
          content: 'text-gray-700 leading-relaxed'
        };
    }
  };

  const styles = getTemplateStyles();

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 h-full">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Resume Preview</h2>

      {htmlContent ? (
        // WYSIWYG HTML content
        <div className={`${styles.container} prose prose-sm max-w-none`}>
          <div 
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            className="resume-content"
          />
        </div>
      ) : (
        // Original template-based layout
        <div className={styles.container}>
          {/* Header section */}
          <div className={styles.header}>
            {selectedTemplate === 'professional' ? (
              // Professional template: side-by-side layout
              <div className="flex justify-between items-start">
                <div>
                  <h1 className={styles.name}>
                    {resumeData.name || "Your Name"}
                  </h1>
                  <div className={styles.contact}>
                    <p className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {resumeData.email || "Your Email"}
                    </p>
                    <p className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {resumeData.phone || "Your Phone"}
                    </p>
                  </div>
                </div>
                {resumeData.profilePicture && (
                  <img
                    src={resumeData.profilePicture}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                  />
                )}
              </div>
            ) : selectedTemplate === 'creative' ? (
              // Creative template: centered with gradient background
              <div className="text-center">
                {resumeData.profilePicture && (
                  <img
                    src={resumeData.profilePicture}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-white mx-auto mb-4 shadow-lg"
                  />
                )}
                <h1 className={styles.name}>
                  {resumeData.name || "Your Name"}
                </h1>
                <div className={styles.contact}>
                  <p className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {resumeData.email || "Your Email"}
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {resumeData.phone || "Your Phone"}
                  </p>
                </div>
              </div>
            ) : (
              // Minimal template: centered layout
              <div className="text-center">
                <h1 className={styles.name}>
                  {resumeData.name || "Your Name"}
                </h1>
                <div className={styles.contact}>
                  <p className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {resumeData.email || "Your Email"}
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {resumeData.phone || "Your Phone"}
                  </p>
                </div>
                {resumeData.profilePicture && (
                  <img
                    src={resumeData.profilePicture}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover mx-auto mt-4 border-4 border-gray-100 shadow-lg"
                  />
                )}
              </div>
            )}
          </div>

          {/* Content sections */}
          <div className="space-y-6">
            <Section title="Education" content={resumeData.education} styles={styles} />
            <Section title="Experience" content={resumeData.experience} styles={styles} />
            <Section title="Skills" content={resumeData.skills} styles={styles} />
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, content, styles }: { 
  title: string; 
  content: string; 
  styles: any;
}) {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      <div 
        className={`${styles.content} whitespace-pre-wrap`}
      >
        {content || `Your ${title}`}
      </div>
    </div>
  );
}
