import PublicLayout from "@/components/layouts/PublicLayout";

const PaidCoursesPage = ({ courses, ...props }) => {
  return (
    <div className="h-full min-h-screen flex flex-col">
      <PublicLayout.header className="bg-pink-50 border-b border-pink-200 shadow-md shadow-pink-100" />
      <PublicLayout.main>
        <Hero className="mx-auto mt-12 max-w-7xl px-4 sm:mt-24" />
        <div className="bg-gray-50 py-6 mt-12 mb-12 sm:mt-24 sm:mb-24">
          hello
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
          <span className="block xl:inline">Paid courses page</span>{' '}
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
export default PaidCoursesPage