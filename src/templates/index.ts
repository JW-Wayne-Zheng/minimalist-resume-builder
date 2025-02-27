export interface Template {
  id: string;
  name: string;
  className: string;
}

export const templates: Template[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    className: 'template-minimal'
  },
  {
    id: 'professional',
    name: 'Professional',
    className: 'template-professional'
  },
  {
    id: 'creative',
    name: 'Creative',
    className: 'template-creative'
  }
];