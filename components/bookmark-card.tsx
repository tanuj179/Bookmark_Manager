"use client"

import type { Bookmark } from "@/types/bookmark"
import { Trash2, ExternalLink } from "lucide-react"

interface BookmarkCardProps {
  bookmark: Bookmark
  onDelete: (id: string) => void
}

export function BookmarkCard({ bookmark, onDelete }: BookmarkCardProps) {
  // Format the date
  const formattedDate = new Date(bookmark.createdAt).toLocaleDateString()

  // Truncate URL for display
  const displayUrl = bookmark.url.length > 40 ? `${bookmark.url.substring(0, 40)}...` : bookmark.url

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "work":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "personal":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "learning":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "entertainment":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="bg-card p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg">{bookmark.title}</h3>
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground flex items-center hover:underline"
          >
            {displayUrl}
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
        <button
          onClick={() => onDelete(bookmark.id)}
          className="text-destructive hover:text-destructive/80 transition-colors"
          aria-label="Delete bookmark"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>

      <div className="flex justify-between items-center mt-3">
        <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(bookmark.category)}`}>
          {bookmark.category}
        </span>
        <span className="text-xs text-muted-foreground">Added on {formattedDate}</span>
      </div>
    </div>
  )
}
