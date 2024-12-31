export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} Todos los derechos reservados
        </p>
      </div>
    </footer>
  )
}