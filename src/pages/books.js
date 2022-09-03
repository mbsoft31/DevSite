import BookController from "@/controllers/BookController";
import PublicLayout from "@/components/layouts/PublicLayout";

const BooksPage = ({books, ...props}) => {
  return (
    <div className="h-full min-h-screen flex flex-col">
      <PublicLayout.header className="bg-pink-50 border-b border-pink-200 shadow-md shadow-pink-100" />
      <PublicLayout.main>
        <Hero className="mx-auto mt-12 max-w-7xl px-4 sm:mt-16" />
        <div className="mt-12 mb-12 sm:mt-16 sm:mb-16">
          <BookList books={books} />
        </div>
      </PublicLayout.main>
      <PublicLayout.footer />
    </div>
  )
}

const BookList = ({ books, ...props}) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between space-x-4">
          <h2 className="text-2xl font-medium text-gray-900">Books list:</h2>
          <a href="#" className="hidden whitespace-nowrap text-sm font-medium text-indigo-600 hover:text-indigo-500">
            View all
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>

        <hr className="my-4 border-pink-500"/>

        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          {
            books.map((book) => (
              <div key={book.id} className="group relative space-y-3">
                <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100">
                  <img src={book.thumb} alt={book.thumb} className="object-cover object-center" />
                  {/*<div className="flex items-end p-4 opacity-0 group-hover:opacity-100" aria-hidden="true">
                    <div className="w-full rounded-md bg-white bg-opacity-75 py-2 px-4 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter">
                      View Book
                    </div>
                  </div>*/}
                </div>
                <div className="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900">
                  <h3>
                    <a href={`/books/${book.id}/${book.slug}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {book.title}
                    </a>
                  </h3>
                  <p>{book.price}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-1">{book.tags && book.tags.map(tag => (
                  <span key={`${tag}-${book.id}`} className="block text-xs px-2 py-px border rounded-md bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600">{tag}</span>
                ))}</div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

const Hero = ({className, ...props}) => {
  return (
    <div className={className} {...props}>
      <div className="text-center">
        <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
          <span className="block xl:inline">Our available books</span>{' '}
          <span className="block text-pink-600 xl:inline">to self improve</span>
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-md md:mt-5 md:max-w-3xl md:text-lg">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
          fugiat veniam occaecat fugiat aliqua.
        </p>
        {/*<div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <a
              href="#"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-pink-600 px-8 py-3 text-base font-medium text-white hover:bg-pink-700 md:py-4 md:px-10 md:text-lg"
            >
              Get started
            </a>
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <a
              href="#"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-pink-600 hover:bg-gray-50 md:py-4 md:px-10 md:text-lg"
            >
              Live demo
            </a>
          </div>
        </div>*/}
      </div>
    </div>
  )
}

export async function getStaticProps(context) {
  const books = await BookController.getAllBooks(context, {})
  return { props: { books } }
}

export default BooksPage
export {
  BookList,
}
