import { useContext } from 'react';
import { CVContext } from '../context/CVContext';
import '../styles/Form.css';

export default function EducationForm() {
  const { cvData, addEducation, updateEducation, removeEducation } = useContext(CVContext);

  const handleInputChange = (id, field, value) => {
    updateEducation(id, { [field]: value });
  };

  return (
    <section className="form-section">
      <h2>Éducation</h2>
      
      {cvData.education.map((entry) => (
        <div key={entry.id} className="form-entry">
          <div className="form-group">
            <label htmlFor={`school-${entry.id}`}>École/Université</label>
            <input
              id={`school-${entry.id}`}
              type="text"
              value={entry.school}
              onChange={(e) => handleInputChange(entry.id, 'school', e.target.value)}
              placeholder="Nom de l'école ou l'université"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor={`degree-${entry.id}`}>Diplôme</label>
              <input
                id={`degree-${entry.id}`}
                type="text"
                value={entry.degree}
                onChange={(e) => handleInputChange(entry.id, 'degree', e.target.value)}
                placeholder="Ex: Licence, Master, etc."
              />
            </div>

            <div className="form-group">
              <label htmlFor={`field-${entry.id}`}>Domaine d'études</label>
              <input
                id={`field-${entry.id}`}
                type="text"
                value={entry.fieldOfStudy}
                onChange={(e) => handleInputChange(entry.id, 'fieldOfStudy', e.target.value)}
                placeholder="Ex: Informatique, Ingénierie, etc."
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor={`startDate-${entry.id}`}>Date de début</label>
              <input
                id={`startDate-${entry.id}`}
                type="date"
                value={entry.startDate}
                onChange={(e) => handleInputChange(entry.id, 'startDate', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor={`endDate-${entry.id}`}>Date de fin</label>
              <input
                id={`endDate-${entry.id}`}
                type="date"
                value={entry.endDate}
                onChange={(e) => handleInputChange(entry.id, 'endDate', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor={`description-${entry.id}`}>Description (optionnel)</label>
            <textarea
              id={`description-${entry.id}`}
              value={entry.description}
              onChange={(e) => handleInputChange(entry.id, 'description', e.target.value)}
              placeholder="Ajoutez des détails supplémentaires sur vos études"
              rows="4"
            />
          </div>

          {cvData.education.length > 1 && (
            <button
              type="button"
              className="btn-remove"
              onClick={() => removeEducation(entry.id)}
            >
              Supprimer cette éducation
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        className="btn-add"
        onClick={addEducation}
      >
        + Ajouter une éducation
      </button>
    </section>
  );
}
