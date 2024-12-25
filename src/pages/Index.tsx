import SimQuiz from "@/components/SimQuiz";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-brand-50/50">
      <div className="container mx-auto py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ¿Qué tipo de SIM necesitas?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Responde unas breves preguntas y te ayudaremos a elegir la mejor opción para tu viaje a Europa.
          </p>
        </div>
        <SimQuiz />
      </div>
    </div>
  );
};

export default Index;