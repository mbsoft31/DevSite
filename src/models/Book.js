import fs from "fs";
import books from "@/pages/books";

const DataProviders = {
  file: {
    database_name: "index.json",
    database_path: "public/data",
  },
  sqlite: {
    database_name: "database.sqlite",
    database_path: "public/data"
  },
  default: "file",
}

class Book {
  static STATUS_PAID = "paid"
  static STATUS_FREE = "free"

  static tableName = "books"
  static modelName = "Book"
  static dataProvider = DataProviders.file

  static isCatalogLoaded = false
  static catalog = []
  
  // props
  id = -1
  title = "Untitled book"
  slug = "untitled_book"
  thumb = null
  date = Date.now()
  tags = []
  draft = true
  content = null
  status = Book.STATUS_FREE
  price = 0

  static columns = ["id", "title", "slug", "thumb", "date", "tags", "draft", "content", "status", "price"]

  constructor({
    id = -1,
    title = "Untitled book",
    slug = "untitled_book",
    thumb = null,
    date = Date.now(),
    tags = [],
    draft = true,
    content = null,
    status = Book.STATUS_FREE,
    price = 0
  }) {
    this.id = id
    this.title = title
    this.slug = slug
    this.thumb = thumb
    this.date = date
    this.tags = tags
    this.draft = draft
    this.content = content
    this.status = status;
    this.price = price
  }

  static init = () => {
    const file = Book.dataProvider.database_path + "/" + Book.dataProvider.database_name
    if (!Book.isModelLoaded()) {
      const response = fs.readFileSync(file)
      const { data } = JSON.parse(response.toString());
      const models = data[Book.tableName];
      if (!models) throw new Error("Model does not exist");
      Book.catalog = models;
      Book.isCatalogLoaded = true;
    }
    return Book
  }

  static isModelLoaded = () => Book.isCatalogLoaded

  /**
   * @return {Book[]} books
   */
  static all = () => {
    /** @var {Book[]} models **/
    let models = []
    if (!Book.isModelLoaded())
      return models
    models = Book.catalog.map(item => {
      const model = {}
      for (const column of Book.columns) {
        model[column] = item[column]
      }
      return new Book(model)
    })
    return models
  }

  /**
   * @param {string} key
   * @param {any|null} value
   *
   * @return {Book} book
   */
  static findOne = (key = "id", value = null) => {
    /** @var Book model **/
    let model = null
    if (!Book.isModelLoaded())
      return model

    const filtered = Book.catalog.filter(item => {
      return item[key] === value
    })

    if ( !filtered || filtered.length < 1 ) return null

    model = filtered[0]
    model.content = Book.getBookContent(model)
    return new Book(model)
  }

  static getBookContent = (book) => {
    const source = fs.readFileSync(`public/data/books/${book.id}/${book.slug}.mdx`)
    return source.toString()
  }

}

class Builder {

  static selects = []
  static queries;

  constructor({selects=[], query=[]}) {
    this.selects = selects;
    this.query = query;
  }

  static select = (columns = []) => {
    this.selects = columns
    return this
  }

  static where = (column, operator, value) => {
    this.addQuery({
      type: "where",
      column,
      operator,
      value,
    })
    return this
  }

  static addQuery = (query) => {
    this.queries.push(query)
  }
}

export default Book.init()