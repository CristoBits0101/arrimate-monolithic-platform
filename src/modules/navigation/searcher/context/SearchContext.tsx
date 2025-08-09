'use client'

import { createContext, useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'

// 1. Creating the context
const SearchContext = createContext<{
  isFocused: boolean
  resetSearchInput: boolean
  searchTerm: string
  searchContainerRef: React.RefObject<HTMLDivElement>
  updateFocus: (focus: boolean) => void
  updateReset: (reset: boolean) => void
  updateSearch: (term: string) => void
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  isTyping: boolean // Añadido a la definición del contexto
} | null>(null)

// 2. Context provider
export function SearchProvider({ children }: { children: React.ReactNode }) {
  // States
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [resetSearchInput, setResetSearchInput] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isTyping, setIsTyping] = useState<boolean>(false)

  // Router
  const router = useRouter()
  const pathname = usePathname()

  // Ref
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const typingTimeout = useRef<NodeJS.Timeout | null>(null)

  // Updates
  const updateFocus = (focus: boolean) => {
    setIsFocused(focus)
  }

  const updateReset = (reset: boolean) => {
    setResetSearchInput(reset)
  }

  const updateSearch = (term: string) => {
    setSearchTerm(term)
  }

  // Handlers
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setIsTyping(true)
    // Reinicia el temporizador al escribir
    if (typingTimeout.current) clearTimeout(typingTimeout.current)
    typingTimeout.current = setTimeout(() => {
      setIsTyping(false)
    }, 450)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchContainerRef.current &&
      searchContainerRef.current.contains(event.target as Node)
    ) {
      return
    }
    setIsFocused(false)
    setSearchTerm('')
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const term = searchTerm.trim()
    if (!term) return
    const locale = pathname?.split('/')[1] || ''
    router.push(`/${locale}/stories?search=${encodeURIComponent(term)}`)
    setIsFocused(false)
    setSearchTerm('')
  }

  // Effects
  useEffect(() => {
    if (resetSearchInput) {
      updateSearch('')
      updateReset(false)
    }
  }, [resetSearchInput])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [searchContainerRef])

  return (
    <SearchContext.Provider
      value={{
        isFocused,
        isTyping,
        resetSearchInput,
        searchContainerRef,
        searchTerm,
        handleChange,
        handleSubmit,
        updateFocus,
        updateReset,
        updateSearch
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export { SearchContext }
