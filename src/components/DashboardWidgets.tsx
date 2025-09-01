import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function StatsBoxes() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Total Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">128</div>
          <div className="text-muted-foreground text-sm">+12 this month</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Active Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">34</div>
          <div className="text-muted-foreground text-sm">+3 new</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">$4,200</div>
          <div className="text-muted-foreground text-sm">
            +8% from last month
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function QuestionWidget() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);

  function handleAsk() {
    setAnswer("This is a fake answer to your question: '" + question + "'.");
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Ask a Question</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <input
            className="border rounded px-3 py-2"
            placeholder="Type your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Button onClick={handleAsk} disabled={!question}>
            Ask
          </Button>
          {answer && <div className="mt-2 text-muted-foreground">{answer}</div>}
        </div>
      </CardContent>
    </Card>
  );
}
