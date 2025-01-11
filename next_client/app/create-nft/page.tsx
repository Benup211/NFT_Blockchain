import MultiStepForm from '@/components/create-nft/multi-step-form';

export default function CreateNFT() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">House & Apartment NFT Minting</h1>
      <MultiStepForm />
    </main>
  )
}

