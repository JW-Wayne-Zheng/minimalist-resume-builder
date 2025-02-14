import { Dispatch, SetStateAction } from "react";

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  education: string;
  experience: string;
  skills: string;
}

export default function ResumeForm({
  setResumeData,
}: {
  setResumeData: Dispatch<SetStateAction<ResumeData>>;
}) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setResumeData((prev: ResumeData) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="h-full p-6 bg-white rounded-lg shadow-md flex flex-col flex-1">
      <h2 className="text-xl font-bold mb-4 text-black">Enter Your Details</h2>

      {/* Wrapping the form in a flex-1 container to distribute space evenly */}
      <div className="flex flex-col flex-1 gap-4">
        {/* Name Field */}
        <div className="flex flex-col flex-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full h-full p-3 border rounded text-black flex-grow"
            onChange={handleChange}
          />
        </div>

        {/* Email Field */}
        <div className="flex flex-col flex-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full h-full p-3 border rounded text-black flex-grow"
            onChange={handleChange}
          />
        </div>

        {/* Phone Field */}
        <div className="flex flex-col flex-1">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="w-full h-full p-3 border rounded text-black flex-grow"
            onChange={handleChange}
          />
        </div>

        {/* Education Field */}
        <div className="flex flex-col flex-1">
          <label
            htmlFor="education"
            className="text-sm font-medium text-gray-700"
          >
            Education
          </label>
          <textarea
            name="education"
            id="education"
            className="w-full h-full p-3 border rounded text-black flex-grow resize-none"
            onChange={handleChange}
          />
        </div>

        {/* Experience Field */}
        <div className="flex flex-col flex-1">
          <label
            htmlFor="experience"
            className="text-sm font-medium text-gray-700"
          >
            Work Experience
          </label>
          <textarea
            name="experience"
            id="experience"
            className="w-full h-full p-3 border rounded text-black flex-grow resize-none"
            onChange={handleChange}
          />
        </div>

        {/* Skills Field */}
        <div className="flex flex-col flex-1">
          <label htmlFor="skills" className="text-sm font-medium text-gray-700">
            Skills
          </label>
          <textarea
            name="skills"
            id="skills"
            className="w-full h-full p-3 border rounded text-black flex-grow resize-none"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
