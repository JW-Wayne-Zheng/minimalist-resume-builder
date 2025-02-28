import { Dispatch, SetStateAction, useState } from "react";

import { validateForm, ValidationErrors } from './utils/validation';
import { ResumeData } from './types/resume';
import ProfilePicture from './components/ProfilePicture';

export default function ResumeForm({ setResumeData, resumeData }: {
  setResumeData: Dispatch<SetStateAction<ResumeData>>,
  resumeData: ResumeData
}) {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setResumeData((prev: ResumeData) => {
      const newData = {
        ...prev,
        [name]: value
      };
      const validationErrors = validateForm(newData);
      setErrors(validationErrors);
      return newData;
    });
  };

  const handleProfilePicture = (imageUrl: string) => {
    setResumeData(prev => ({
      ...prev,
      profilePicture: imageUrl
    }));
  };

  return (
    <div className="h-full space-y-4">
      <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden h-full">
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Enter Your Details</h2>
          
          <ProfilePicture onImageChange={handleProfilePicture} />
          
          <div className="space-y-4 mt-4">
            {/* Form fields with enhanced styling */}
            <div className="space-y-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={resumeData.name}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 
                  focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                onChange={handleChange}
                placeholder="Enter your full name"
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
                value={resumeData.email}
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
                value={resumeData.phone}
                className="w-full h-full p-3 border rounded text-black flex-grow"
                onChange={handleChange}
              />
            </div>

            {/* Education Field */}
            <div className="flex flex-col flex-1">
              <label htmlFor="education" className="text-sm font-medium text-gray-700">
                Education
              </label>
              <textarea
                name="education"
                id="education"
                value={resumeData.education}
                className="w-full p-3 border rounded text-black resize-y min-h-[100px]"
                onChange={handleChange}
              />
            </div>

            {/* Experience Field */}
            <div className="flex flex-col flex-1">
              <label htmlFor="experience" className="text-sm font-medium text-gray-700">
                Work Experience
              </label>
              <textarea
                name="experience"
                id="experience"
                value={resumeData.experience}
                className="w-full p-3 border rounded text-black resize-y min-h-[150px]"
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
                value={resumeData.skills}
                className="w-full p-3 border rounded text-black resize-y min-h-[100px]"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Move error messages inside the main container */}
      {(errors.email || errors.phone) && (
        <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-lg sticky bottom-0">
          {errors.email && (
            <p className="text-red-700 text-sm">{errors.email}</p>
          )}
          {errors.phone && (
            <p className="text-red-700 text-sm">{errors.phone}</p>
          )}
        </div>
      )}
    </div>
  );
}
