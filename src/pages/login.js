import { useState } from 'react'
import { Switch } from '@headlessui/react'
import PublicLayout from "@/components/layouts/PublicLayout";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function LoginPage() {
  return (
    <div className="h-full min-h-screen flex flex-col">
      <PublicLayout.header className="bg-pink-50 border-b border-pink-200 shadow-md shadow-pink-100" />
      <PublicLayout.main>
        <div className="max-w-xl mx-auto my-16">
          <div className="text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Access your account</h2>
            <p className="mt-4 text-lg leading-6 text-gray-500">
              Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet. Sapien tortor lacus
              arcu.
            </p>
          </div>
          <div className="mt-12">
            <LoginForm />
          </div>
        </div>
      </PublicLayout.main>
      <PublicLayout.footer />
    </div>
  )
}

const LoginForm = () => {
  const [agreed, setAgreed] = useState(false)
  return (
    <form action="#" method="POST" className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
      <div className="sm:col-span-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 flex rtl:flex-row-reverse items-center">
            <label htmlFor="country" className="sr-only">
              Country
            </label>
            <select
              id="country"
              name="country"
              className="h-full rounded-md border-transparent bg-transparent py-0 pl-4 pr-8 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option>DZ</option>
              <option>TN</option>
              <option>EU</option>
              <option>US</option>
            </select>
          </div>
          <input
            type="text"
            name="phone-number"
            id="phone-number"
            autoComplete="tel"
            className="block w-full rounded-md border-gray-300 py-3 px-4 pl-20 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="+213 (6-66) 66-666-6"
            dir={'ltr'}
          />
        </div>
      </div>
      <div className="sm:col-span-2">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Switch
              checked={agreed}
              onChange={setAgreed}
              className={classNames(
                agreed ? 'bg-indigo-600' : 'bg-gray-200',
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              )}
            >
              <span className="sr-only">Agree to policies</span>
              <span
                aria-hidden="true"
                className={classNames(
                  agreed ? 'ltr:translate-x-5 rtl:-translate-x-5' : 'translate-x-0',
                  'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                )}
              />
            </Switch>
          </div>
          <div className="ml-3">
            <p className="text-base text-gray-500">
              By selecting this, you agree to the{' '}
              <a href="#" className="font-medium text-gray-700 underline">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="#" className="font-medium text-gray-700 underline">
                Cookie Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Log in
        </button>
      </div>
    </form>
  )
}