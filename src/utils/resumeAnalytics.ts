import { validateEmail, validatePhone } from './validation';
import { ResumeData } from '../types/resume';

export interface ResumeScore {
  total: number;
  sections: {
    [key: string]: number;
  };
  suggestions: string[];
}

export const analyzeResume = (resumeData: ResumeData): ResumeScore => {
  const score: ResumeScore = {
    total: 0,
    sections: {},
    suggestions: []
  };

  try {
    // Basic information completeness
    score.sections.name = resumeData?.name ? 100 : 0;
    score.sections.email = (resumeData?.email && validateEmail(resumeData.email)) ? 100 : 0;
    score.sections.phone = (resumeData?.phone && validatePhone(resumeData.phone)) ? 100 : 0;

    // Content analysis
    const experienceText = String(resumeData?.experience || '').trim();
    if (experienceText) {
      const wordCount = experienceText.split(/\s+/).filter(word => word.length > 0).length;
      score.sections.experience = Math.min(100, (wordCount / 50) * 100);
      if (wordCount < 50) {
        score.suggestions.push('Consider adding more details to your experience section');
      }
    } else {
      score.sections.experience = 0;
      score.suggestions.push('Add your work experience');
    }

    // Education analysis
    const educationText = String(resumeData?.education || '').trim();
    if (educationText) {
      const wordCount = educationText.split(/\s+/).filter(word => word.length > 0).length;
      score.sections.education = Math.min(100, (wordCount / 30) * 100);
      if (wordCount < 30) {
        score.suggestions.push('Add more details to your education section');
      }
    } else {
      score.sections.education = 0;
      score.suggestions.push('Add your education details');
    }

    // Skills analysis
    const skillsText = String(resumeData?.skills || '').trim();
    if (skillsText) {
      const skillCount = skillsText.split(/,\s*/).filter(skill => skill.length > 0).length;
      score.sections.skills = Math.min(100, (skillCount / 5) * 100);
      if (skillCount < 5) {
        score.suggestions.push('List more relevant skills (aim for at least 5)');
      }
    } else {
      score.sections.skills = 0;
      score.suggestions.push('Add your skills');
    }

    // Calculate total score
    const sectionValues = Object.values(score.sections);
    score.total = sectionValues.length > 0 
      ? Math.round(sectionValues.reduce((a, b) => a + b, 0) / sectionValues.length)
      : 0;

  } catch (error) {
    console.error('Error analyzing resume:', error);
    score.total = 0;
    score.suggestions.push('Error analyzing resume content');
  }

  return score;
};