import { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from "next/link";
import { useConfig } from "@/contexts/config";

const NavigationLink = ({children, ...props}) => (
  <Link {...props}>
    {children}
  </Link>
)

export default function NavigationMain() {
  const state = useConfig()
  const [navigation, setNavigation] = useState()

  useEffect(() => {
    console.log(state);
    let locale = state?.app?.locale || "ar"
    console.log(locale)
    let nav;
    if (locale && locale === "ar") {
      nav = [
        { name: "الصفحة الرئيسية", href: "/" },
        { name: "دورات مجانية", href: "/free_courses" },
        { name: "دورات حصرية", href: "/paid_courses" },
        { name: "كتب", href: "/books" },
        { name: "تواصل معنا", href: "/contact" }
      ]
    }else {
      nav = [
        { name: 'Home', href: '/' },
        { name: 'Free courses', href: '/free_courses' },
        { name: 'Paid courses', href: '/paid_courses' },
        { name: 'Books', href: '/books' },
        { name: 'Contact us', href: '/contact' },
      ]
    }
    setNavigation(nav)
  }, [])
  return (
    <Popover>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav className="relative flex items-center justify-between sm:justify-center" aria-label="Global">
          <div className="flex flex-1 items-center sm:absolute sm:inset-y-0 sm:left-0">
            <div className="flex w-full items-center justify-between sm:w-auto">
              <a href="#">
                <span className="sr-only">Workflow</span>
                <img
                  className="h-8 w-auto sm:h-10"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=pink&shade=600"
                  alt=""
                />
              </a>
              <div className="-mr-2 flex items-center sm:hidden">
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-gray-50 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500">
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex sm:space-x-10">
            {navigation && navigation.map((item) => (
              <NavigationLink className="" key={item.name} href={item.href}>
                <a className="block font-medium text-pink-900 border-b-2 border-transparent hover:text-pink-600 hover:border-pink-600 py-6">
                  {item.name}
                </a>
              </NavigationLink>
            ))}
          </div>
          <div className="hidden space-x-3 sm:absolute sm:inset-y-0 sm:right-0 sm:flex sm:items-center sm:justify-end">
            <span className="inline-flex">
              <NavigationLink href={"/login"}>
                <a className="inline-flex items-center rounded-md px-4 py-2 text-base font-medium text-pink-600 hover:bg-pink-100">
                  {"Log in"}
                </a>
              </NavigationLink>
            </span>
            {/*<span className="inline-flex">
              <NavigationLink href={"/register"}>
                <a className="inline-flex items-center rounded-md px-4 py-2 text-base font-medium text-pink-600 hover:bg-pink-100">
                  {"Create an account"}
                </a>
              </NavigationLink>
            </span>*/}
          </div>
        </nav>
      </div>

      <Transition
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition sm:hidden"
        >
          <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
            <div className="flex items-center justify-between px-5 pt-4">
              <div>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=pink&shade=600"
                  alt=""
                />
              </div>
              <div className="-mr-2">
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500">
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="px-2 pt-2 pb-3">
              {navigation && navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <Link href="/src/pages/login">
              <a className="block w-full bg-gray-50 px-5 py-3 text-center font-medium text-pink-600 hover:bg-gray-100">
                Log in
              </a>
            </Link>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}