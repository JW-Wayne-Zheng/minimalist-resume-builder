import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TemplateSelection from './pages/TemplateSelection';
import ResumeEditor from './pages/ResumeEditor';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100">
        <Routes>
          <Route path="/" element={<Navigate to="/templates" replace />} />
          <Route path="/templates" element={<TemplateSelection />} />
          <Route path="/editor" element={<ResumeEditor />} />
        </Routes>
      </div>
    </Router>
  );
}
