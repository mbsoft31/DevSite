// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fs from "fs";

export default function handler(req, res) {
  console.log(req.body, req.method);
  const source = fs.readFileSync('public/data/index.json')
  const data = JSON.parse(source)
  res.status(200).json(data)
}
