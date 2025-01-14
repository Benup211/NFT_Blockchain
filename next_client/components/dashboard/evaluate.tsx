import EvaluateProperty from './evaluate-property/evaluate-property';

export default function Evaluate() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10">Property Value Predictor</h1>
      <EvaluateProperty />
    </main>
  )
}

