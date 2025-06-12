
export async function getGoogleBookByIsbn(isbn) {
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)

  if (!response.ok) {
    throw new Error('Failed to fetch from Google Books')
  }

  const data = await response.json()
  if (data.totalItems > 0) {
    return data.items[0].volumeInfo
  }

  return null
}

export async function getGoogleCoverByIsbn(isbn) {
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)

  if (!response.ok) {
    throw new Error('Failed to fetch from Google Books')
  }

  const data = await response.json()
  return data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail || null
}
