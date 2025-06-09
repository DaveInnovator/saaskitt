import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import ToolPage from "./pages/ToolPage";
import Success from "./pages/Success";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TextSummarizerPage from "./pages/TextSummarizer";
import ResumeOptimizerPage from "./pages/ResumeOptimizer";
import CoverLetterGeneratorPage from "./pages/CoverLetterGenerator";
import ColdEmailWriterPage from "./pages/ColdEmailWriterPage";
import InstagramCaptionWizardPage from "./pages/InstagramCaptionWizard";
import StudentPromptAssistantPage from "./pages/StudyPromptAssistant";
// import PricingPage from "./pages/Pricing";
function App() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes> 
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/:slug" element={<ToolPage />} />
            {/* <Route path="/pricing" element={<PricingPage />} /> */}
            <Route path="/success" element={<Success />} />
            <Route path="/tools/text-summarizer" element={<TextSummarizerPage />} />
            <Route path="/tools/resume-optimizer" element={<ResumeOptimizerPage />} />
            <Route path="/tools/cover-letter-gen" element={<CoverLetterGeneratorPage />} />
            <Route path="/tools/ig-caption" element={<InstagramCaptionWizardPage />} />
            <Route path="/tools/cold-email-writer" element={<ColdEmailWriterPage />} />
             <Route path="/tools/student-assistant" element={<StudentPromptAssistantPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
