import logo from '../assets/branding/logo.png';
import {Navbar,NFTCard,Footer} from "../components/common/";
import realstate1 from '../assets/images/realstate1.png'

import { useState } from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import { HeartIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

const product = {
  name: '10 floor Building at Kathmandu',
  price: '$140,000',
  images: [
    {
      id: 1,
      name: 'Hotel front View One',
      src: {realstate1},
      alt: 'front view building',
    },
    {
      id: 2,
      name: 'Hotel View One',
      src: {realstate1},
      alt: 'front view building',
    },
    // More images...
  ],
  description: `
    <p>This hotel offers luxurious accommodations with modern amenities, perfect for both business and leisure travelers. Located in the heart of the city, it provides easy access to local attractions and dining options. Enjoy exceptional service, comfort, and a relaxing stay tailored to your needs.</p>
  `,
  details: [
    {
      name: 'Features',
      items: [
        'Modern Architecture & Sustainable Design', 'Contemporary style with eco-friendly materials and energy-efficient systems',
        'Smart Technology', 'Automated lighting, heating, and security for convenience and safety'
      ],
    },
    // More sections...
  ],
}






export const NFTDescriptionPage=()=>{
  

  return (
    <div className="main bg-gray-900 min-h-screen flex flex-col">
    <div className="relative isolate overflow-hidden flex-grow">
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      >
        <defs>
          <pattern
            x="50%"
            y={-1}
            id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" width="100%" height="100%" strokeWidth={0} />
      </svg>
      <div
        aria-hidden="true"
        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
      >
        <div
          style={{
            clipPath:
              'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
          }}
          className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
        />
      </div>
      <div className="">
<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
  <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
    {/* Image gallery */}
    <TabGroup className="flex flex-col-reverse">
      {/* Image selector */}
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <TabList className="grid grid-cols-4 gap-6">
          {product.images.map((image) => (
            <Tab
              key={image.id}
              className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-200 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
            >
              <span className="sr-only">{image.name}</span>
              <span className="absolute inset-0 overflow-hidden rounded-md">
                <img alt="" src={image.src.realstate1} className="h-full w-full object-cover object-center" />
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-[selected]:ring-orange-500"
              />
            </Tab>
          ))}
        </TabList>
      </div>

      <TabPanels className="aspect-h-1 aspect-w-1 w-full">
        {product.images.map((image) => (
          <TabPanel key={image.id}>
            <img
              alt={image.alt}
              src= {realstate1}
              className="h-full w-full object-cover object-center sm:rounded-lg"
            />
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>

    {/* Product info */}
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <h1 className="text-3xl font-bold tracking-tight text-gray-200">{product.name}</h1>

      <div className="mt-3">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl tracking-tight text-gray-300">{product.price}</p>
      </div>


      <div className="mt-6">
        <h3 className="sr-only">Description</h3>

        <div
          dangerouslySetInnerHTML={{ __html: product.description }}
          className="space-y-6 text-base text-gray-300"
        />
      </div>

      <form className="mt-6">

        <div className="mt-10 flex">
          <button
            type="submit"
            className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-orange-600 px-8 py-3 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
          >
           Make an Offer
          </button>

          <button
            type="button"
            className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-300"
          >
            <HeartIcon aria-hidden="true" className="h-6 w-6 flex-shrink-0" />
            <span className="sr-only">Add to favorites</span>
          </button>
        </div>
      </form>

      <section aria-labelledby="details-heading" className="mt-12">
        <h2 id="details-heading" className="sr-only">
          Additional details
        </h2>

        <div className="divide-y divide-gray-200 border-t">
          {product.details.map((detail) => (
            <Disclosure key={detail.name} as="div">
              <h3>
                <DisclosureButton className="group relative flex w-full items-center justify-between py-6 text-left">
                  <span className="text-sm font-medium text-gray-200 group-data-[open]:text-orange-600">
                    {detail.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    <PlusIcon
                      aria-hidden="true"
                      className="block h-6 w-6 text-gray-200 group-hover:text-gray-500 group-data-[open]:hidden"
                    />
                    <MinusIcon
                      aria-hidden="true"
                      className="hidden h-6 w-6 text-orange-400 group-hover:text-orange-500 group-data-[open]:block"
                    />
                  </span>
                </DisclosureButton>
              </h3>
              <DisclosurePanel className="prose prose-sm pb-6 text-gray-400">
                <ul role="list">
                  {detail.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </DisclosurePanel>
            </Disclosure>
          ))}
        </div>
      </section>
    </div>
  </div>
</div>
</div>

    </div>
  </div>

   
  )
}




