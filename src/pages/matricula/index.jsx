import { useState } from 'react';
import { MATRICULA_TYPES, THEME_COLORS } from './utils/constants';
import useMatriculaForm from './hooks/useMatriculaForm';
import TipoMatriculaSelector from './components/TipoMatriculaSelector';
import EstudianteForm from './components/EstudianteForm';
import ApoderadoForm from './components/ApoderadoForm';
import PromocionForm from './components/PromocionForm';
import DocumentosUpload from './components/DocumentosUpload';
import ComentariosForm from './components/ComentariosForm';
import AlertMessage, { ALERT_TYPES } from './components/AlertMessage';
import ConfirmationScreen from './components/ConfirmationScreen';
import ConsultaMatricula from './components/ConsultaMatricula';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { toast } from 'react-toastify';
import { Loader2, Save, ArrowLeft } from 'lucide-react';

/**
 * Componente principal para la sección de matrícula
 * @returns {JSX.Element} Componente de matrícula
 */
const Matricula5 = () => {
  // Estados para controlar la navegación
  const [tipoMatricula, setTipoMatricula] = useState('');
  const [showConsulta, setShowConsulta] = useState(false);

  // Hook personalizado para gestionar el formulario
  const {
    formData,
    errors,
    touchedFields,
    isSubmitting,
    isSubmitted,
    submitSuccess,
    submitError,
    solicitudId,
    uploadProgress,
    isConsulting,
    consultResult,
    handleInputChange,
    handleFileChange,
    removeFile,
    submitForm,
    consultarMatricula,
    resetForm
  } = useMatriculaForm(tipoMatricula);

  /**
   * Maneja el cambio de tipo de matrícula
   * @param {string} tipo - Tipo de matrícula
   */
  const handleTipoMatriculaChange = (tipo) => {
    setTipoMatricula(tipo);
    setShowConsulta(false);
  };

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = async () => {
    try {
      const success = await submitForm();

      if (success) {
        toast.success('Matrícula registrada con éxito');
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      toast.error('Error al registrar la matrícula. Por favor, intente nuevamente.');
    }
  };

  /**
   * Maneja el clic en el botón de consulta
   */
  const handleConsultClick = () => {
    setShowConsulta(true);
    setTipoMatricula('');
  };

  /**
   * Maneja la consulta de matrícula
   * @param {string} dni - DNI del estudiante
   * @param {string} anioEscolar - Año escolar
   */
  const handleConsultar = async (dni, anioEscolar) => {
    try {
      const result = await consultarMatricula(dni, anioEscolar);

      if (result.success && result.found) {
        toast.success('Matrícula encontrada');
      } else if (result.success && !result.found) {
        toast.info('No se encontraron matrículas para el DNI proporcionado');
      } else {
        toast.error('Error al consultar la matrícula');
      }
    } catch (error) {
      console.error('Error al consultar matrícula:', error);
      toast.error('Error al consultar la matrícula. Por favor, intente nuevamente.');
    }
  };

  /**
   * Renderiza el contenido principal según el estado actual
   * @returns {JSX.Element} Contenido principal
   */
  const renderContent = () => {
    // Si se ha enviado el formulario con éxito, mostrar pantalla de confirmación
    if (isSubmitted && submitSuccess) {
      return (
        <ConfirmationScreen
          tipoMatricula={tipoMatricula}
          solicitudId={solicitudId}
          dniEstudiante={formData.dniEstudiante}
          dniApoderado={formData.dniApoderado}
          onReset={() => {
            resetForm();
            setTipoMatricula('');
          }}
        />
      );
    }

    // Si se está mostrando la consulta, mostrar componente de consulta
    if (showConsulta) {
      return (
        <ConsultaMatricula
          onConsultar={handleConsultar}
          isConsulting={isConsulting}
          consultResult={consultResult}
          onBack={() => setShowConsulta(false)}
        />
      );
    }

    // Si no se ha seleccionado un tipo de matrícula, mostrar selector
    if (!tipoMatricula) {
      return (
        <TipoMatriculaSelector
          selectedType={tipoMatricula}
          onSelect={handleTipoMatriculaChange}
          onConsultClick={handleConsultClick}
        />
      );
    }

    // Si se ha seleccionado un tipo de matrícula, mostrar formulario
    return (
      <>
        {/* Botón para volver al selector */}
        <div className="mb-6">
          <button
            onClick={() => setTipoMatricula('')}
            className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Volver a selección
          </button>
        </div>

        {/* Mensaje de error si existe */}
        {submitError && (
          <AlertMessage
            type={ALERT_TYPES.ERROR}
            title="Error al registrar la matrícula"
            message={submitError}
            onClose={() => {}}
          />
        )}

        {/* Formulario de datos del estudiante */}
        <EstudianteForm
          formData={formData}
          handleInputChange={handleInputChange}
          tipoMatricula={tipoMatricula}
          errors={errors}
          touchedFields={touchedFields}
        />

        {/* Formulario de datos del apoderado (solo para nueva y traslado) */}
        <ApoderadoForm
          formData={formData}
          handleInputChange={handleInputChange}
          tipoMatricula={tipoMatricula}
          errors={errors}
          touchedFields={touchedFields}
        />

        {/* Formulario de promoción (solo para siguiente grado) */}
        <PromocionForm
          formData={formData}
          handleInputChange={handleInputChange}
          tipoMatricula={tipoMatricula}
          errors={errors}
          touchedFields={touchedFields}
        />

        {/* Sección de documentos */}
        <DocumentosUpload
          tipoMatricula={tipoMatricula}
          handleFileChange={handleFileChange}
          uploadProgress={uploadProgress}
          removeFile={removeFile}
          errors={errors}
        />

        {/* Comentarios adicionales */}
        <ComentariosForm
          formData={formData}
          handleInputChange={handleInputChange}
          tipoMatricula={tipoMatricula}
          errors={errors}
          touchedFields={touchedFields}
        />

        {/* Botón de envío */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center px-6 py-3 rounded-lg text-white font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            style={{
              backgroundColor: THEME_COLORS[tipoMatricula].primary,
              ':hover': { backgroundColor: THEME_COLORS[tipoMatricula].dark }
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="mr-2 animate-spin" />
                Procesando...
              </>
            ) : (
              <>
                <Save size={20} className="mr-2" />
                Enviar Solicitud
              </>
            )}
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
        <div className="max-w-5xl mx-auto px-4">
          {/* Contenido principal */}
          {renderContent()}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Matricula5;
