import Error from "next/error";
import fs from "fs";

import Book from "@/models/Book";

export default function handler(req, res) {

  switch (req.method) {
    case 'GET':
      return index(req, res)
    case 'POST':

      break
    default:
      throw new Error('Only supported methods: GET, POST')
  }
}

const index = (req, res) => {
  const [id, slug] = req.query.slug
  const source = fs.readFileSync('public/data/index.json')
  const { data } = JSON.parse(`${source}`)
  const book = Book.findOne("slug", slug)
    // data.books.filter(book => book.id === parseInt(id) && book.slug === slug)[0]
  res.status(200).json(book)
}

