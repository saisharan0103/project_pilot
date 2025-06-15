import React, { useState } from 'react';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';

export default function PlanningGenerator() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data.text ?? '');
      } else {
        setResult(data.error || 'Error');
      }
    } catch (err) {
      console.error(err);
      setResult('Error generating');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Planning Generator</CardTitle>
      </CardHeader>
      <form onSubmit={handleGenerate}>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="prompt" className="mb-2 block text-sm font-medium">
              Describe your project
            </label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Result</label>
            <Textarea value={result} readOnly className="h-48" />
          </div>
        </CardContent>
        <CardFooter>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </CardFooter>
      </form>
    </Card>
  );
}
