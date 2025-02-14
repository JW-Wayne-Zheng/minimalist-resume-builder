import "./App.css";

interface ResumeData {
  name?: string;
  email?: string;
  phone?: string;
  education?: string;
  experience?: string;
  skills?: string;
}

export default function ResumePreview({
  resumeData,
}: {
  resumeData: ResumeData;
}) {
  return (
    <div className="h-full w-full p-6 bg-white rounded-lg shadow-md flex flex-col overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Resume Preview</h2>

      {/* Name Section */}
      <p className="text-lg font-semibold text-black break-words">
        {resumeData.name || "Your Name"}
      </p>
      <p className="text-gray-600 break-words">
        {resumeData.email || "Your Email"}
      </p>
      <p className="text-gray-600 break-words">
        {resumeData.phone || "Your Phone"}
      </p>

      {/* Education Section */}
      <h3 className="font-bold mt-4">Education</h3>
      <p className="text-gray-600 whitespace-pre-wrap break-words">
        {resumeData.education || "Your Education"}
      </p>

      {/* Experience Section */}
      <h3 className="font-bold mt-4">Experience</h3>
      <p className="text-gray-600 whitespace-pre-wrap break-words">
        {resumeData.experience || "Your Experience"}
      </p>

      {/* Skills Section */}
      <h3 className="font-bold mt-4">Skills</h3>
      <p className="text-gray-600 whitespace-pre-wrap break-words">
        {resumeData.skills || "Your Skills"}
      </p>
    </div>
  );
}
