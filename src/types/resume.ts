export interface Education {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  education: Education[];
  experience: Experience[];
  skills: string[];
}