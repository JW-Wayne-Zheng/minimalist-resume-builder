import { ResumeData } from '../types/resume';

export interface ResumeScore {
  total: number;
  sections: {
    [key: string]: number;
  };
  suggestions: string[];
}

export const analyzeResume = (_resumeData: ResumeData): ResumeScore | null => {
  console.info('Resume analysis is temporarily disabled while we prepare AI-powered scoring.');

  return null;
};
