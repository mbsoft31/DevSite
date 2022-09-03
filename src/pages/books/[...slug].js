import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";

import BookController from "@/controllers/BookController";

import { StarIcon, CheckIcon } from "@heroicons/react/20/solid";

import PublicLayout from "@/components/layouts/PublicLayout";

const BookDetailPage = ({ book, mdxSource, ...props }) => {
  const DetailComponent = useMemo(() => getMDXComponent(mdxSource), [mdxSource])
  return (
    <div className="h-full min-h-screen flex flex-col">
      <PublicLayout.header className="bg-pink-50 border-b border-pink-200 shadow-md shadow-pink-100" />
      <PublicLayout.main className={"bg-gray-50"}>
        {/*<Hero className="mx-auto mt-12 max-w-7xl px-4 sm:mt-24" />*/}
        <div className="bg-pink-100 py-6 mt-8 mb-12 sm:mt-12 sm:mb-12">
          <Book book={book} component={DetailComponent}></Book>
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
        <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
          <span className="block xl:inline">Free courses page</span>{' '}
          <span className="block text-pink-600 xl:inline"></span>
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

const Book = ({book, component, ...props}) => {
  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{book.title}</h1>
          </div>
          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Book information
            </h2>

            <div className="flex items-center space-x-4">
              <p className="text-lg text-gray-900 sm:text-xl">{book.price}</p>

              <div className="border-l border-gray-300 pl-4">
                <h2 className="sr-only">Reviews</h2>
                <div className="flex items-center space-x-2">
                  <div>
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            4.5 > rating ? 'text-yellow-400' : 'text-gray-300',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{4.5} out of 5 stars</p>
                  </div>
                  <p className="text-sm text-gray-500" dir="ltr">{100} reviews</p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{book.summary}</p>
              <div className={"prose lg:prose-xld"} >
                { component() }
              </div>
            </div>

            <div className="mt-6 flex items-center space-x-3">
              <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
              <p className="text-sm text-gray-500">In stock and ready to ship</p>
            </div>
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-start">
          <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
            <img
              src={book.images[0].src}
              alt={book.images[0].filename}
              width={book.images[0].width}
              height={book.images[0].height}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths(context) {
  let books = await BookController.getAllBooks(context, {})
  return {
    paths: formatPaths(books),
    fallback: false, // can also be true or 'blocking'
  }
}

export async function getStaticProps(context) {
  const id = context.params.slug[0]
  const slug = context.params.slug[1]

  const { mdxSource, frontMatter: book} = await BookController.getMdxBundle(context, { id, slug })

  return {
    props: {
      book,
      mdxSource
    }, // will be passed to the page component as props
  }
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const formatPaths = (models) => {
  return models.map(
    model => ({params: { slug: [`${model.id}`, `${model.slug}`] }})
  )
}

export default BookDetailPage;