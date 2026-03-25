import PersonalInfoForm from './components/PersonalInfoForm'
import EducationForm from './components/EducationForm'
import ExperienceForm from './components/ExperienceForm'
import SkillsForm from './components/SkillsForm'
import CVPreview from './components/CVPreview'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <div className="form-section-container">
        <h1>CV Builder</h1>
        <PersonalInfoForm />
        <EducationForm />
        <ExperienceForm />
        <SkillsForm />
      </div>
      <div className="preview-container">
        <CVPreview />
      </div>
    </div>
  )
}

export default App
