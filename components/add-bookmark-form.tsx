"use client"

import type React from "react"

import { useState } from "react"
import type { Bookmark } from "@/types/bookmark"

interface AddBookmarkFormProps {
  onAddBookmark: (bookmark: Omit<Bookmark, "id" | "createdAt">) => void
}

export function AddBookmarkForm({ onAddBookmark }: AddBookmarkFormProps) {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [category, setCategory] = useState("work")
  const [urlError, setUrlError] = useState("")
  const [titleError, setTitleError] = useState("")

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch (e) {
      return false
    }
  }

  const validateTitle = (title: string): boolean => {
    // Title should not be empty and should be at least 3 characters
    if (!title.trim()) {
      setTitleError("Title is required")
      return false
    }

    if (title.trim().length < 3) {
      setTitleError("Title must be at least 3 characters long")
      return false
    }

    // Title should start with a letter and contain only letters, numbers, and spaces
    const titlePattern = /^[a-zA-Z][a-zA-Z0-9\s]*$/
    if (!titlePattern.test(title)) {
      setTitleError("Title must start with a letter and contain only letters, numbers, and spaces")
      return false
    }

    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Clear previous errors
    setTitleError("")
    setUrlError("")

    // Validate title
    const isTitleValid = validateTitle(title)

    // Validate URL
    let isUrlValid = true
    if (!url.trim()) {
      setUrlError("URL is required")
      isUrlValid = false
    } else if (!validateUrl(url)) {
      setUrlError("Please enter a valid URL (include http:// or https://)")
      isUrlValid = false
    }

    // If either validation fails, stop form submission
    if (!isTitleValid || !isUrlValid) {
      return
    }

    // Add the bookmark
    onAddBookmark({
      title,
      url,
      category,
    })

    // Reset form
    setTitle("")
    setUrl("")
    setCategory("work")
  }

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold mb-4">Add New Bookmark</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              if (titleError) setTitleError("")
            }}
            className={`w-full p-2 border rounded-md bg-background ${titleError ? "border-red-500" : ""}`}
          />
          {titleError && <p className="text-red-500 text-sm mt-1">{titleError}</p>}
        </div>

        <div>
          <label htmlFor="url" className="block text-sm font-medium mb-1">
            URL
          </label>
          <input
            id="url"
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value)
              if (urlError) setUrlError("")
            }}
            placeholder="https://example.com"
            className={`w-full p-2 border rounded-md bg-background ${urlError ? "border-red-500" : ""}`}
          />
          {urlError && <p className="text-red-500 text-sm mt-1">{urlError}</p>}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded-md bg-background"
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="learning">Learning</option>
            <option value="entertainment">Entertainment</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          Add Bookmark
        </button>
      </form>
    </div>
  )
}
