import { useContext, useState } from 'react';
import { CVContext } from '../context/CVContext';
import '../styles/Form.css';

export default function PersonalInfoForm() {
    const { cvData, updatePersonalInfo } = useContext(CVContext);
    const [isEditing, setIsEditing] = useState(true);
    const [tempData, setTempData] = useState(cvData.personalInfo);
    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setTempData(prev => ({
            ...prev,
            [field]: value
        }));
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!tempData.fullName?.trim()) newErrors.fullName = 'Le nom complet est obligatoire';
        if (!tempData.email?.trim()) newErrors.email = 'L\'email est obligatoire';
        if (!tempData.phone?.trim()) newErrors.phone = 'Le téléphone est obligatoire';
        if (!tempData.location?.trim()) newErrors.location = 'La localisation est obligatoire';
        return newErrors;
    };

    const handleConfirm = () => {
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        updatePersonalInfo(tempData);
        setIsEditing(false);
        setErrors({});
    };

    const handleCancel = () => {
        setTempData(cvData.personalInfo);
        setIsEditing(false);
        setErrors({});
    };

    const toggleEdit = () => {
        if (!isEditing) {
            setTempData(cvData.personalInfo);
        }
        setIsEditing(!isEditing);
        setErrors({});
    };

    const hasData = () => {
        return cvData.personalInfo.fullName && cvData.personalInfo.email && cvData.personalInfo.phone && cvData.personalInfo.location;
    };

    return (
        <section className="form-section">
            <h2>Informations Personnelles</h2>
            {isEditing ? (
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="fullName">Nom complet *</label>
                        <input
                            id="fullName"
                            type="text"
                            value={tempData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            placeholder="Votre nom complet"
                            className={errors.fullName ? 'error' : ''}
                        />
                        {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input
                                id="email"
                                type="email"
                                value={tempData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                placeholder="votre.email@exemple.com"
                                className={errors.email ? 'error' : ''}
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Téléphone *</label>
                            <input
                                id="phone"
                                type="tel"
                                value={tempData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                placeholder="+33 6 12 34 56 78"
                                className={errors.phone ? 'error' : ''}
                            />
                            {errors.phone && <span className="error-message">{errors.phone}</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Localisation *</label>
                        <input
                            id="location"
                            type="text"
                            value={tempData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            placeholder="Ville, Pays"
                            className={errors.location ? 'error' : ''}
                        />
                        {errors.location && <span className="error-message">{errors.location}</span>}
                    </div>

                    <div className="form-buttons">
                        <button
                            type="button"
                            className="btn-confirm"
                            onClick={handleConfirm}
                        >
                            ✓ Confirmer
                        </button>
                        {hasData() && (
                            <button
                                type="button"
                                className="btn-cancel"
                                onClick={handleCancel}
                            >
                                ✕ Annuler
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    {hasData() ? (
                        <div className="form-preview">
                            <h3>{cvData.personalInfo.fullName}</h3>
                            <p><strong>Email :</strong> {cvData.personalInfo.email}</p>
                            <p><strong>Téléphone :</strong> {cvData.personalInfo.phone}</p>
                            <p><strong>Localisation :</strong> {cvData.personalInfo.location}</p>
                        </div>
                    ) : (
                        <div className="form-preview">
                            <p>Aucune information personnelle ajoutée</p>
                        </div>
                    )}
                    <div className="form-buttons">
                        <button
                            type="button"
                            className="btn-edit"
                            onClick={toggleEdit}
                        >
                            ✏️ Modifier
                        </button>
                    </div>
                </>
            )}
        </section>
    );
}
