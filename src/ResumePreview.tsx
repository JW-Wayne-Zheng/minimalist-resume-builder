import "./App.css";
import { ResumeData } from "./types/resume";

export default function ResumePreview({ resumeData }: { resumeData: ResumeData }) {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 h-full">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Resume Preview</h2>

      <div className="space-y-4">
        {/* Profile section */}
        <div className="flex items-center gap-6">
          {resumeData.profilePicture && (
            <img
              src={resumeData.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover ring-4 ring-gray-50"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {resumeData.name || "Your Name"}
            </h1>
            <div className="space-y-1 mt-2">
              <p className="text-gray-600 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {resumeData.email || "Your Email"}
              </p>
              <p className="text-gray-600 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {resumeData.phone || "Your Phone"}
              </p>
            </div>
          </div>
        </div>

        {/* Other sections with enhanced styling */}
        <div className="space-y-6 divide-y divide-gray-100">
          <Section title="Education" content={resumeData.education} />
          <Section title="Experience" content={resumeData.experience} />
          <Section title="Skills" content={resumeData.skills} />
        </div>
      </div>
    </div>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <div className="pt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
      <div className="text-gray-600 whitespace-pre-wrap">
        {content || `Your ${title}`}
      </div>
    </div>
  );
}
