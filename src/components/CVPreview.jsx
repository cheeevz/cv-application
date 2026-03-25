import { useContext } from 'react';
import { CVContext } from '../context/CVContext';
import '../styles/CVPreview.css';

export default function CVPreview() {
    const { cvData } = useContext(CVContext);

    return (
        <section className="cv-preview">
            <h1>Aperçu du CV</h1>
            <div className="cv-container">
                {/* Informations Personnelles */}
                {cvData.personalInfo.fullName && (
                    <div className="cv-section">
                        <h1 className="cv-title">{cvData.personalInfo.fullName}</h1>
                        <div className="cv-contact">
                            {cvData.personalInfo.email && <p>📧 {cvData.personalInfo.email}</p>}
                            {cvData.personalInfo.phone && <p>📱 {cvData.personalInfo.phone}</p>}
                            {cvData.personalInfo.location && <p>📍 {cvData.personalInfo.location}</p>}
                        </div>
                    </div>
                )}

                {/* Section Éducation */}
                {cvData.education.length > 0 && cvData.education.some(e => e.school) && (
                    <div className="cv-section">
                        <h2 className="cv-section-title">Éducation</h2>
                        {cvData.education.map((entry) => (
                            entry.school && (
                                <div key={entry.id} className="cv-item">
                                    <div className="cv-item-header">
                                        <h3>{entry.school}</h3>
                                        {entry.startDate && entry.endDate && (
                                            <span className="cv-date">
                                                {entry.startDate} - {entry.endDate}
                                            </span>
                                        )}
                                    </div>
                                    {entry.degree && <p className="cv-subtitle">{entry.degree}</p>}
                                    {entry.fieldOfStudy && <p className="cv-field">{entry.fieldOfStudy}</p>}
                                    {entry.description && <p className="cv-description">{entry.description}</p>}
                                </div>
                            )
                        ))}
                    </div>
                )}

                {/* Section Expérience */}
                {cvData.experience.length > 0 && cvData.experience.some(e => e.company) && (
                    <div className="cv-section">
                        <h2 className="cv-section-title">Expériences Professionnelles</h2>
                        {cvData.experience.map((entry) => (
                            entry.company && (
                                <div key={entry.id} className="cv-item">
                                    <div className="cv-item-header">
                                        <h3>{entry.position}</h3>
                                        {entry.startDate && entry.endDate && (
                                            <span className="cv-date">
                                                {entry.startDate} - {entry.endDate}
                                            </span>
                                        )}
                                    </div>
                                    <p className="cv-subtitle">{entry.company}</p>
                                    {entry.description && <p className="cv-description">{entry.description}</p>}
                                </div>
                            )
                        ))}
                    </div>
                )}

                {/* Section Compétences */}
                {cvData.skills.length > 0 && cvData.skills.some(s => s.name) && (
                    <div className="cv-section">
                        <h2 className="cv-section-title">Compétences</h2>
                        <div className="cv-skills">
                            {cvData.skills.map((skill) => (
                                skill.name && (
                                    <div key={skill.id} className="cv-skill">
                                        <span className="skill-name">{skill.name}</span>
                                        <span className="skill-level">
                                            {skill.level === 'beginner' && '●○○'}
                                            {skill.level === 'intermediate' && '●●○'}
                                            {skill.level === 'advanced' && '●●●'}
                                        </span>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                )}

                {!cvData.personalInfo.fullName && (
                    <div className="cv-empty">
                        <p>Remplissez les formulaires pour voir l'aperçu du CV</p>
                    </div>
                )}
            </div>
        </section>
    );
}
