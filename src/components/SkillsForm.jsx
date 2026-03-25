import { useContext, useState } from 'react';
import { CVContext } from '../context/CVContext';
import '../styles/Form.css';

export default function SkillsForm() {
    const { cvData, addSkill, updateSkill, removeSkill } = useContext(CVContext);
    const [editingIds, setEditingIds] = useState(new Set());
    const [errors, setErrors] = useState({});

    const handleInputChange = (id, field, value) => {
        updateSkill(id, { [field]: value });
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
        if (!entry.name?.trim()) newErrors.name = 'Le nom de la compétence est obligatoire';
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
        return entry.name;
    };

    return (
        <section className="form-section">
            <h2>Compétences</h2>
            {cvData.skills.map((entry) => (
                <div key={entry.id} className="form-entry">
                    {isEditing(entry.id) ? (
                        <>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor={`skill-${entry.id}`}>Compétence *</label>
                                    <input
                                        id={`skill-${entry.id}`}
                                        type="text"
                                        value={entry.name}
                                        onChange={(e) => handleInputChange(entry.id, 'name', e.target.value)}
                                        placeholder="Ex: JavaScript, React, etc."
                                        className={errors[entry.id]?.name ? 'error' : ''}
                                    />
                                    {errors[entry.id]?.name && <span className="error-message">{errors[entry.id].name}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor={`level-${entry.id}`}>Niveau</label>
                                    <select
                                        id={`level-${entry.id}`}
                                        value={entry.level}
                                        onChange={(e) => handleInputChange(entry.id, 'level', e.target.value)}
                                    >
                                        <option value="beginner">Débutant</option>
                                        <option value="intermediate">Intermédiaire</option>
                                        <option value="advanced">Avancé</option>
                                    </select>
                                </div>
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
                                <h3>{entry.name}</h3>
                                <p><strong>Niveau :</strong> {entry.level === 'beginner' ? 'Débutant' : entry.level === 'intermediate' ? 'Intermédiaire' : 'Avancé'}</p>
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
                                {cvData.skills.length > 1 && (
                                    <button
                                        type="button"
                                        className="btn-remove"
                                        onClick={() => removeSkill(entry.id)}
                                    >
                                        Supprimer cette compétence
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
                        addSkill();
                        const newId = Math.max(...cvData.skills.map(s => s.id), 0) + 1;
                        setEditingIds(new Set([...editingIds, newId]));
                    }}
                >
                    + Ajouter une compétence
                </button>
            )}
        </section>
    );
}
