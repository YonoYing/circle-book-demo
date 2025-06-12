
const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL

export async function getBooks() {
  const response = await fetch(`${API_BASE_URL}/books`);

  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export async function getBookById(id) {
  const response = await fetch(`${API_BASE_URL}/books/${id}`)
  if (!response.ok) {
    throw new Error('Book not found')
  }
  const data = await response.json()
  return data.book
}

export async function purchaseBook(id) {
  const response = await fetch(`${API_BASE_URL}/books/${id}/purchase`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bookId: id })
  })

  if (!response.ok) {
    throw new Error('Purchase failed')
  }

  const data = await response.json()
  return data.book
}
