import PublicLayout from "@/components/layouts/PublicLayout";
import BookController from "@/controllers/BookController";
import Link from "next/link";

const HomePage = ({ books, ...props }) => {
  return (
    <div className="h-full min-h-screen flex flex-col">
      <PublicLayout.header className="bg-pink-50 border-b border-pink-200 shadow-md shadow-pink-100" />
      <PublicLayout.main>
        <Hero className="mx-auto mt-12 max-w-7xl px-4 sm:mt-24" />
        <div className="bg-gray-50 py-6 mt-12 mb-12 sm:mt-24 sm:mb-24">
          <BookList books={books} />
        </div>
      </PublicLayout.main>
      <PublicLayout.footer />
    </div>
  )
}

const Hero = ({className, ...props}) => {
  return (
    <div className={className} {...props}>
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">Data to enrich your</span>{' '}
          <span className="block text-pink-600 xl:inline">online business</span>
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
          fugiat veniam occaecat fugiat aliqua.
        </p>
        <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
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
        </div>
      </div>
    </div>
  )
}

const BookList = ({ books, ...props}) => {
  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between space-x-4">
          <h2 className="text-2xl font-medium text-gray-900">Books list:</h2>
          <Link href="/books">
            <a className="whitespace-nowrap text-sm font-medium text-pink-600 hover:text-pink-500">
              View all
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </Link>
        </div>

        <hr className="my-4 border-pink-500"/>

        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          {
            books.map((book) => (
              <div key={book.id} className="relative space-y-3 bg-white dark:bg-pink-900 rounded-lg border border-gray-100 overflow-hidden">
                <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100">
                  <img src={book.thumb} alt={book.thumb} className="object-cover object-center" />
                  {/*<div className="flex items-end p-4 opacity-0 group-hover:opacity-100" aria-hidden="true">
                    <div className="w-full rounded-md bg-white bg-opacity-75 py-2 px-4 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter">
                      View Book
                    </div>
                  </div>*/}
                </div>
                <div className="px-4 py-2 mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900">
                  <h3>
                    <Link href={`/books/${book.id}/${book.slug}`}>
                      <a>
                        {book.title}
                      </a>
                    </Link>
                  </h3>
                  <p>{book.price}</p>
                </div>
                <div className="flex flex-wrap gap-2 px-4 py-2 mt-1">{book.tags && book.tags.map(tag => (
                  <Link key={`${tag}-${book.id}`} href={"#"}>
                    <a key={`${tag}-${book.id}`} className="block text-xs px-2 py-px border rounded-md cursor-pointer bg-gray-50 text-gray-400 hover:bg-pink-100 hover:text-gray-600">
                      {tag}
                    </a>
                  </Link>
                ))}</div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps(context) {
  const books = await BookController.getAllBooks(context, {})
  return { props: { books } }
}
export default HomePage