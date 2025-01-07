import { CreatePostDialog } from "./CreatePostDialog"

export function BlogHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Blog</h2>
        <p className="text-muted-foreground">
          Gestiona el contenido del blog
        </p>
      </div>
      <CreatePostDialog />
    </div>
  )
}