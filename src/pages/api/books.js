// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fs from "fs";
import Error from "next/error";

import Book from "@/models/Book";

export default function handler(req, res) {

  switch (req.method) {
    case 'GET':
      try {
        const books = all()
        res.status(200).json(books);
      } catch (e) {
        console.error(e)
      }
      break
    case 'POST':
      store(req, res, (error, response) => {
        if (error) throw error;
        let student = JSON.parse(response);
        res.status(201).json(data)
      })
      break
    default:
      throw new Error('Only supported methods: GET, POST')
  }
}

const index = (req, res, callback) => {
  const books = all()
  /*if ( !books || books.length <= 0 )
    callback(new Error("no book available"), null)*/
  callback(null, books)
}

function store(req, res, callback = (error, response) => {}) {
  fs.readFile('public/data/index.json', callback)
}

