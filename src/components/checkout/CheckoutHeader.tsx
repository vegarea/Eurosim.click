export function CheckoutHeader() {
  return (
    <div className="flex justify-end mb-4">
      <Button
        variant="outline"
        size="sm"
        onClick={onLoadTestData}
        className="flex items-center gap-2"
      >
        <Bug className="w-4 h-4" />
        Cargar datos de prueba
      </Button>
    </div>
  );
}
