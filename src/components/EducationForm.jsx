import { useContext, useState } from 'react';
import { CVContext } from '../context/CVContext';
import '../styles/Form.css';

export default function EducationForm() {
    const { cvData, addEducation, updateEducation, removeEducation } = useContext(CVContext);
    const [editingIds, setEditingIds] = useState(new Set());
    const [errors, setErrors] = useState({});

    const handleInputChange = (id, field, value) => {
        updateEducation(id, { [field]: value });
        if (errors[id]?.[field]) {
            setErrors(prev => ({
                ...prev,
                [id]: {
                    ...prev[id],
                    [field]: ''
                }
            }));
        }
    };

    const validateEntry = (entry) => {
        const newErrors = {};
        if (!entry.school?.trim()) newErrors.school = 'L\'école/université est obligatoire';
        if (!entry.degree?.trim()) newErrors.degree = 'Le diplôme est obligatoire';
        if (!entry.fieldOfStudy?.trim()) newErrors.fieldOfStudy = 'Le domaine d\'études est obligatoire';
        if (!entry.startDate?.trim()) newErrors.startDate = 'La date de début est obligatoire';
        if (!entry.endDate?.trim()) newErrors.endDate = 'La date de fin est obligatoire';
        return newErrors;
    };

    const handleConfirm = (id, entry) => {
        const newErrors = validateEntry(entry);
        if (Object.keys(newErrors).length > 0) {
            setErrors(prev => ({
                ...prev,
                [id]: newErrors
            }));
            return;
        }
        const newEditingIds = new Set(editingIds);
        newEditingIds.delete(id);
        setEditingIds(newEditingIds);
        setErrors(prev => {
            const updated = { ...prev };
            delete updated[id];
            return updated;
        });
    };

    const toggleEdit = (id) => {
        const newEditingIds = new Set(editingIds);
        if (newEditingIds.has(id)) {
            newEditingIds.delete(id);
        } else {
            newEditingIds.add(id);
        }
        setEditingIds(newEditingIds);
    };

    const isEditing = (id) => editingIds.has(id);

    const hasData = (entry) => {
        return entry.school || entry.degree || entry.fieldOfStudy || entry.startDate || entry.endDate || entry.description;
    };

    return (
        <section className="form-section">
            <h2>Éducation</h2>

            {cvData.education.map((entry) => (
                <div key={entry.id} className="form-entry">
                    {isEditing(entry.id) ? (
                        <>
                            <div className="form-group">
                                <label htmlFor={`school-${entry.id}`}>École/Université *</label>
                                <input
                                    id={`school-${entry.id}`}
                                    type="text"
                                    value={entry.school}
                                    onChange={(e) => handleInputChange(entry.id, 'school', e.target.value)}
                                    placeholder="Nom de l'école ou l'université"
                                    className={errors[entry.id]?.school ? 'error' : ''}
                                />
                                {errors[entry.id]?.school && <span className="error-message">{errors[entry.id].school}</span>}
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor={`degree-${entry.id}`}>Diplôme *</label>
                                    <input
                                        id={`degree-${entry.id}`}
                                        type="text"
                                        value={entry.degree}
                                        onChange={(e) => handleInputChange(entry.id, 'degree', e.target.value)}
                                        placeholder="Ex: Licence, Master, etc."
                                        className={errors[entry.id]?.degree ? 'error' : ''}
                                    />
                                    {errors[entry.id]?.degree && <span className="error-message">{errors[entry.id].degree}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor={`field-${entry.id}`}>Domaine d'études *</label>
                                    <input
                                        id={`field-${entry.id}`}
                                        type="text"
                                        value={entry.fieldOfStudy}
                                        onChange={(e) => handleInputChange(entry.id, 'fieldOfStudy', e.target.value)}
                                        placeholder="Ex: Informatique, Ingénierie, etc."
                                        className={errors[entry.id]?.fieldOfStudy ? 'error' : ''}
                                    />
                                    {errors[entry.id]?.fieldOfStudy && <span className="error-message">{errors[entry.id].fieldOfStudy}</span>}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor={`startDate-${entry.id}`}>Date de début *</label>
                                    <input
                                        id={`startDate-${entry.id}`}
                                        type="date"
                                        value={entry.startDate}
                                        onChange={(e) => handleInputChange(entry.id, 'startDate', e.target.value)}
                                        className={errors[entry.id]?.startDate ? 'error' : ''}
                                    />
                                    {errors[entry.id]?.startDate && <span className="error-message">{errors[entry.id].startDate}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor={`endDate-${entry.id}`}>Date de fin *</label>
                                    <input
                                        id={`endDate-${entry.id}`}
                                        type="date"
                                        value={entry.endDate}
                                        onChange={(e) => handleInputChange(entry.id, 'endDate', e.target.value)}
                                        className={errors[entry.id]?.endDate ? 'error' : ''}
                                    />
                                    {errors[entry.id]?.endDate && <span className="error-message">{errors[entry.id].endDate}</span>}
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

                            <div className="form-buttons">
                                <button
                                    type="button"
                                    className="btn-confirm"
                                    onClick={() => handleConfirm(entry.id, entry)}
                                >
                                    ✓ Confirmer
                                </button>
                                <button
                                    type="button"
                                    className="btn-cancel"
                                    onClick={() => toggleEdit(entry.id)}
                                >
                                    ✕ Annuler
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="form-preview">
                                <h3>{entry.school}</h3>
                                {entry.degree && <p><strong>Diplôme :</strong> {entry.degree}</p>}
                                {entry.fieldOfStudy && <p><strong>Domaine :</strong> {entry.fieldOfStudy}</p>}
                                {entry.startDate && <p><strong>Début :</strong> {entry.startDate}</p>}
                                {entry.endDate && <p><strong>Fin :</strong> {entry.endDate}</p>}
                                {entry.description && <p><strong>Description :</strong> {entry.description}</p>}
                            </div>

                            <div className="form-buttons">
                                {hasData(entry) && (
                                    <button
                                        type="button"
                                        className="btn-edit"
                                        onClick={() => toggleEdit(entry.id)}
                                    >
                                        ✏️ Éditer
                                    </button>
                                )}
                                {cvData.education.length > 1 && (
                                    <button
                                        type="button"
                                        className="btn-remove"
                                        onClick={() => removeEducation(entry.id)}
                                    >
                                        Supprimer ce diplôme
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </div>
            ))}

            {editingIds.size === 0 && (
                <button
                    type="button"
                    className="btn-add"
                    onClick={() => {
                        addEducation();
                        const newId = Math.max(...cvData.education.map(e => e.id), 0) + 1;
                        setEditingIds(new Set([...editingIds, newId]));
                    }}
                >
                    + Ajouter un diplôme
                </button>
            )}
        </section>
    );
}
