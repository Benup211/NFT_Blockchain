
import { BoltIcon, CalendarDaysIcon, UsersIcon } from '@heroicons/react/24/outline'
import heroimage1 from '../assets/images/hero1image.png'
import {NFTCard} from '../components/common'


const primaryFeatures = [
    {
        name: 'NFT Market Place',
        description:
            'Non quo aperiam repellendus quas est est. Eos aut dolore aut ut sit nesciunt. Ex tempora quia. Sit nobis consequatur dolores incidunt.',
        href: '#',
        icon: BoltIcon,
    },
    {
        name: 'Easily Create Contracts',
        description:
            'Effortlessly create secure contracts for buying or selling property with advanced blockchain and AI tools. Simplify transactions, ensure transparency, and enjoy a smooth, hassle-free process.',
        href: '#',
        icon: UsersIcon,
    },
    {
        name: '"Manage your legal process with smart contracts."',
        description:
            'Manage legal agreements efficiently and securely using smart contracts on blockchain',
        href: '#',
        icon: CalendarDaysIcon,
    },
]
// const secondaryFeatures = [
//     {
//         name: 'Push to deploy.',
//         description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.',
//         icon: CloudArrowUpIcon,
//     },
//     {
//         name: 'SSL certificates.',
//         description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
//         icon: LockClosedIcon,
//     },
//     {
//         name: 'Simple queues.',
//         description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.',
//         icon: ArrowPathIcon,
//     },
//     {
//         name: 'Advanced security.',
//         description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.',
//         icon: FingerPrintIcon,
//     },
//     {
//         name: 'Powerful API.',
//         description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
//         icon: Cog6ToothIcon,
//     },
//     {
//         name: 'Database backups.',
//         description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. ',
//         icon: ServerIcon,
//     },
// ]
// const stats = [
//     { id: 1, name: 'Developers on the platform', value: '8,000+' },
//     { id: 2, name: 'Daily requests', value: '900m+' },
//     { id: 3, name: 'Uptime guarantee', value: '99.9%' },
//     { id: 4, name: 'Projects deployed', value: '12m' },
// ]


export const HomePage=()=>{
    return (
        <div className="bg-gray-900">
            <main>
                {/* Hero section */}
                <div className="relative isolate overflow-hidden">
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
                    <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-40 lg:flex lg:px-8 lg:pt-40">
                        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
                            <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                                24/7 Real Estate Closings
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-300">
                                We leverage AI and blockchain technology for smooth and secure transactions
                            </p>
                            <div className="mt-10 flex items-center gap-x-6">
                                <a
                                    href="#"
                                    className="rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                                >
                                    Get started
                                </a>
                                <a href="#" className="text-sm font-semibold leading-6 text-white">
                                    Learn How It Works  <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                                <img
                                    alt="App screenshot"
                                    src={heroimage1}
                                    width={1494}
                                    height={1442}
                                    className="w-3/6 h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 object-cover"
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {/* Logo cloud */}
                {/* <div className="mx-auto mt-8 max-w-7xl px-6 sm:mt-16 lg:px-8">
                    <h2 className="text-center text-lg font-semibold leading-8 text-white">
                        The world’s most innovative companies use our app
                    </h2>
                    <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                        <img
                            alt="Transistor"
                            src="https://tailwindui.com/img/logos/158x48/transistor-logo-white.svg"
                            width={158}
                            height={48}
                            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        />
                        <img
                            alt="Reform"
                            src="https://tailwindui.com/img/logos/158x48/reform-logo-white.svg"
                            width={158}
                            height={48}
                            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        />
                        <img
                            alt="Tuple"
                            src="https://tailwindui.com/img/logos/158x48/tuple-logo-white.svg"
                            width={158}
                            height={48}
                            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        />
                        <img
                            alt="SavvyCal"
                            src="https://tailwindui.com/img/logos/158x48/savvycal-logo-white.svg"
                            width={158}
                            height={48}
                            className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                        />
                        <img
                            alt="Statamic"
                            src="https://tailwindui.com/img/logos/158x48/statamic-logo-white.svg"
                            width={158}
                            height={48}
                            className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                        />
                    </div>
                </div> */}

                {/* Feature section */}
                <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-base font-semibold leading-7 text-orange-500">Accelerate Your Buying and Selling</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Smart Property Transactions with Blockchain and AI
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                        Seamless buying, selling, escrow, and contract management for your property—powered by blockchain and AI for secure, transparent, and convenient transactions.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                            {primaryFeatures.map((feature) => (
                                <div key={feature.name} className="flex flex-col">
                                    <dt className="text-base font-semibold leading-7 text-white">
                                        <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500">
                                            <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300">
                                        <p className="flex-auto">{feature.description}</p>
                                        <p className="mt-6">
                                            <a href={feature.href} className="text-sm font-semibold leading-6 text-orange-300">
                                                Learn more <span aria-hidden="true">→</span>
                                            </a>
                                        </p>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>

                {/* Feature section */}
                {/* <div className="mt-32 sm:mt-56">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl sm:text-center">
                            <h2 className="text-base font-semibold leading-7 text-indigo-400">Everything you need</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">No server? No problem.</p>
                            <p className="mt-6 text-lg leading-8 text-gray-300">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque,
                                iste dolor cupiditate blanditiis.
                            </p>
                        </div>
                    </div>
                    <div className="relative overflow-hidden pt-16">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <img
                                alt="App screenshot"
                                src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
                                width={2432}
                                height={1442}
                                className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-white/10"
                            />
                            <div aria-hidden="true" className="relative">
                                <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-gray-900 pt-[7%]" />
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
                        <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
                            {secondaryFeatures.map((feature) => (
                                <div key={feature.name} className="relative pl-9">
                                    <dt className="inline font-semibold text-white">
                                        <feature.icon aria-hidden="true" className="absolute left-1 top-1 h-5 w-5 text-indigo-500" />
                                        {feature.name}
                                    </dt>{' '}
                                    <dd className="inline">{feature.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div> */}

                {/* Stats */}
                {/* <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                        <h2 className="text-base font-semibold leading-8 text-indigo-400">Our track record</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Trusted by thousands of developers&nbsp;worldwide
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste
                            dolor cupiditate blanditiis ratione.
                        </p>
                    </div>
                    <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-white sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.id} className="flex flex-col gap-y-3 border-l border-white/10 pl-6">
                                <dt className="text-sm leading-6">{stat.name}</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight">{stat.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div> */}

               {/* NFT Card */}
               
               <NFTCard/>

                
                
                {/* CTA section */}
                <div className="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8">
                    <svg
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                    >
                        <defs>
                            <pattern
                                x="50%"
                                y={0}
                                id="1d4240dd-898f-445f-932d-e2872fd12de3"
                                width={200}
                                height={200}
                                patternUnits="userSpaceOnUse"
                            >
                                <path d="M.5 200V.5H200" fill="none" />
                            </pattern>
                        </defs>
                        <svg x="50%" y={0} className="overflow-visible fill-gray-800/20">
                            <path
                                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                                strokeWidth={0}
                            />
                        </svg>
                        <rect fill="url(#1d4240dd-898f-445f-932d-e2872fd12de3)" width="100%" height="100%" strokeWidth={0} />
                    </svg>
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-10 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
                    >
                        <div
                            style={{
                                clipPath:
                                    'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                            }}
                            className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
                        />
                    </div>
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Boost your productivity.
                            <br />
                            Start using our app today.
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                            Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur
                            commodo do ea.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a
                                href="#"
                                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                Get started
                            </a>
                            <a href="#" className="text-sm font-semibold leading-6 text-white">
                                Learn more <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                </div>
            </main>

          
        </div>
    )
}
