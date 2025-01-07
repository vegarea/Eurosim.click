import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { CompatibilityChat } from "./esim/CompatibilityChat"

export function SimQuiz() {
  const [showQuiz, setShowQuiz] = useState(false)
  const [showCompatibilityChat, setShowCompatibilityChat] = useState(false)

  const handleNotSure = () => {
    setShowQuiz(false)
    setShowCompatibilityChat(true)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Button 
        onClick={() => setShowQuiz(true)}
        className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
      >
        ¿Mi teléfono es compatible?
      </Button>

      <Dialog open={showQuiz} onOpenChange={setShowQuiz}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-center">
              ¿Tu teléfono es compatible con eSIM?
            </h3>
            <div className="grid gap-2">
              <button
                onClick={() => setShowQuiz(false)}
                className="w-full p-4 text-lg hover:bg-brand-50/50 transition-all"
              >
                Sí, mi teléfono es compatible
              </button>
              <button
                onClick={() => setShowQuiz(false)}
                className="w-full p-4 text-lg hover:bg-brand-50/50 transition-all"
              >
                No, mi teléfono no es compatible
              </button>
              <button
                onClick={handleNotSure}
                className="w-full p-4 text-lg hover:bg-brand-50/50 transition-all"
              >
                No estoy seguro
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showCompatibilityChat} onOpenChange={setShowCompatibilityChat}>
        <DialogContent className="sm:max-w-md">
          <CompatibilityChat />
        </DialogContent>
      </Dialog>
    </div>
  )
}