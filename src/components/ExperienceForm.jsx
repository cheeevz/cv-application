import { useContext, useState } from 'react';
import { CVContext } from '../context/CVContext';
import '../styles/Form.css';

export default function ExperienceForm() {
    const { cvData, addExperience, updateExperience, removeExperience } = useContext(CVContext);
    const [editingIds, setEditingIds] = useState(new Set());
    const [errors, setErrors] = useState({});

    const handleInputChange = (id, field, value) => {
        updateExperience(id, { [field]: value });
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
        if (!entry.company?.trim()) newErrors.company = 'L\'entreprise est obligatoire';
        if (!entry.position?.trim()) newErrors.position = 'Le poste est obligatoire';
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
        return entry.company || entry.position || entry.startDate || entry.endDate || entry.description;
    };

    return (
        <section className="form-section">
            <h2>Expérience</h2>
            {cvData.experience.map((entry) => (
                <div key={entry.id} className="form-entry">
                    {isEditing(entry.id) ? (
                        <>
                            <div className="form-group">
                                <label htmlFor={`company-${entry.id}`}>Entreprise *</label>
                                <input
                                    id={`company-${entry.id}`}
                                    type="text"
                                    value={entry.company}
                                    onChange={(e) => handleInputChange(entry.id, 'company', e.target.value)}
                                    placeholder="Nom de l'entreprise"
                                    className={errors[entry.id]?.company ? 'error' : ''}
                                />
                                {errors[entry.id]?.company && <span className="error-message">{errors[entry.id].company}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor={`position-${entry.id}`}>Poste *</label>
                                <input
                                    id={`position-${entry.id}`}
                                    type="text"
                                    value={entry.position}
                                    onChange={(e) => handleInputChange(entry.id, 'position', e.target.value)}
                                    placeholder="Votre titre de poste"
                                    className={errors[entry.id]?.position ? 'error' : ''}
                                />
                                {errors[entry.id]?.position && <span className="error-message">{errors[entry.id].position}</span>}
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
                                    placeholder="Décrivez votre expérience"
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
                                <h3>{entry.position} - {entry.company}</h3>
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
                                {cvData.experience.length > 1 && (
                                    <button
                                        type="button"
                                        className="btn-remove"
                                        onClick={() => removeExperience(entry.id)}
                                    >
                                        Supprimer cette expérience
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
                        addExperience();
                        const newId = Math.max(...cvData.experience.map(e => e.id), 0) + 1;
                        setEditingIds(new Set([...editingIds, newId]));
                    }}
                >
                    + Ajouter une expérience
                </button>
            )}
        </section>
    );
}
