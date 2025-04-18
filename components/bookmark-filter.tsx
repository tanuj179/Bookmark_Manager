"use client"

interface BookmarkFilterProps {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export function BookmarkFilter({ categories, selectedCategory, onSelectCategory }: BookmarkFilterProps) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold mb-4">Filter Bookmarks</h2>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
              selectedCategory === category ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            {category === "all" ? "All Bookmarks" : category}
          </button>
        ))}
      </div>
    </div>
  )
}
