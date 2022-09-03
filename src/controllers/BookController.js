import { bundleMDX } from "mdx-bundler";
import readingTime from "reading-time";

const BASE_PATH = "http://localhost:3000/data"
const BOOKS_DATA_URL = `${BASE_PATH}/index.json`
const BOOK_URL = (id, slug) => `${BASE_PATH}/books/${id}/${slug}.mdx`

const getAllBooks = async (context, query = {}) => {
  const queries = {...query}
  const params = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  let books = null

  const fetchResponse = await fetch(BOOKS_DATA_URL, params)
  const { data } = await fetchResponse.json()
  books = data.books.map(book => book)

  return books
}

const getBookContent = async (context, {id, slug} = {}, query = {}) => {

  if ( !( id && slug ) ) return null

  const queries = {...query}
  const params = {}
  let bookContent = null

  const fetchResponse = await fetch(BOOK_URL(id, slug), params)
  bookContent = await fetchResponse.text()

  console.log("bookContent", BOOK_URL(id, slug));

  return bookContent
}

const getBookMeta = async (context, { id, slug }, query = {}) => {
  const books = await getAllBooks(context, query)
  const book = books.filter(book => book.id === parseInt(id) && book.slug === slug)
  return book[0] ?? null
}

const getMdxBundle = async (context, { id, slug }, query= {}) => {
  const source = await getBookContent(context, { id, slug },query)
  const bookMeta = await getBookMeta(context, { id, slug },query)

  if (!(source && bookMeta)) return null

  console.log(source, bookMeta);

  const { code, frontmatter } = await bundleMDX(
    {
      source,
    })

  return {
    mdxSource: code,
    frontMatter: {
      ...bookMeta,
      readingTime: readingTime(code),
      ...frontmatter,
      date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
    },
  }
}

export default {
  getAllBooks,
  getBookContent,
  getBookMeta,
  getMdxBundle
}