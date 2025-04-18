"use client"

import { useState, useEffect } from "react"
import { BookmarkList } from "@/components/bookmark-list"
import { AddBookmarkForm } from "@/components/add-bookmark-form"
import { BookmarkFilter } from "@/components/bookmark-filter"
import { ThemeToggle } from "@/components/theme-toggle"
import type { Bookmark } from "@/types/bookmark"

export default function Home() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmark[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Load bookmarks from localStorage on initial render
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarks")
    if (savedBookmarks) {
      const parsedBookmarks = JSON.parse(savedBookmarks).map((bookmark: any) => ({
        ...bookmark,
        createdAt: new Date(bookmark.createdAt),
      }))
      setBookmarks(parsedBookmarks)
      setFilteredBookmarks(parsedBookmarks)
    }
  }, [])

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))

    // Apply filtering
    if (selectedCategory === "all") {
      setFilteredBookmarks(bookmarks)
    } else {
      setFilteredBookmarks(bookmarks.filter((bookmark) => bookmark.category === selectedCategory))
    }
  }, [bookmarks, selectedCategory])

  // Add a new bookmark
  const addBookmark = (bookmark: Omit<Bookmark, "id" | "createdAt">) => {
    const newBookmark: Bookmark = {
      ...bookmark,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    }
    setBookmarks([...bookmarks, newBookmark])
  }

  // Delete a bookmark
  const deleteBookmark = (id: string) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id))
  }

  // Get unique categories for the filter
  const categories = ["all", ...new Set(bookmarks.map((b) => b.category))]

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Bookmark Manager</h1>
        <ThemeToggle />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="sticky top-4 space-y-6">
            <AddBookmarkForm onAddBookmark={addBookmark} />
            <BookmarkFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <BookmarkList bookmarks={filteredBookmarks} onDeleteBookmark={deleteBookmark} />
        </div>
      </div>
    </main>
  )
}
