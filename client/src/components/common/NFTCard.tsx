const products = [
    {
      id: 1,
      name: 'Soltee Hotel',
      href: '#',
      price: '$256,00',
      description: '5 Star Hotels famous and very good hotel',
      imageSrc: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/d3/30/81/caption.jpg?w=700&h=-1&s=1',
      imageAlt: 'Hotel Images',
    },
    {
      id: 1,
      name: 'Home Stay Land',
      href: '#',
      price: '$256,00',
      description: 'Best Homestay in the town ',
      imageSrc: 'https://www.trekkingplus.com/uploads/img/Riepe-village-homestay-in-Nepal.jpg',
      imageAlt: 'Hotel Images',
    },
    {
      id: 1,
      name: 'Home Stay Land',
      href: '#',
      price: '$256,00',
      description: 'Best Homestay in the town ',
      imageSrc: 'https://www.trekkingplus.com/uploads/img/Riepe-village-homestay-in-Nepal.jpg',
      imageAlt: 'Hotel Images',
    },
   

    // More products...
  ]
  
  export default function NFTCard() {
    return (
      <div className="bg-transparent mt-11">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-white text-4xl font-bold">Top property</h2>
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8 py-10">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                  <img
                    alt={product.imageAlt}
                    src={product.imageSrc}
                    className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                  />
                </div>
                <div className="flex flex-1 flex-col space-y-2 p-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <div className="flex flex-1 flex-col justify-end">
                    <p className="text-base font-medium text-gray-900">{product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }