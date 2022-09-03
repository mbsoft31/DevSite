import fs from "fs";
import Error from "next/error";

export default function handler(req, res) {

  switch (req.method) {
    case 'GET':
      index(req, res, (error, response) => {
        if (error) throw error;
        const { data } = JSON.parse(response);
        const { courses } = data
        res.status(200).json(courses)
      })
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

const index = (req, res, callback = (error, response) => {}) => {
  fs.readFile('public/data/index.json', callback)
}

function show(req, res, callback = (error, response) => {}) {
  fs.readFile('public/data/index.json', callback)
}

function store(req, res, callback = (error, response) => {}) {
  fs.readFile('public/data/index.json', callback)
}

