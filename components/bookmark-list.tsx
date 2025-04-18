import type { Bookmark } from "@/types/bookmark"
import { BookmarkCard } from "./bookmark-card"

interface BookmarkListProps {
  bookmarks: Bookmark[]
  onDeleteBookmark: (id: string) => void
}

export function BookmarkList({ bookmarks, onDeleteBookmark }: BookmarkListProps) {
  if (bookmarks.length === 0) {
    return (
      <div className="bg-card p-8 rounded-lg shadow-sm border text-center">
        <p className="text-muted-foreground">No bookmarks found. Add some bookmarks to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} onDelete={onDeleteBookmark} />
      ))}
    </div>
  )
}
