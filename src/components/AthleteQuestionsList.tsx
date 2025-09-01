import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const fakeQuestions = [
  {
    id: 1,
    athlete: "John Doe",
    question: "How can I improve my sprint speed?",
    date: "2025-08-30",
  },
  {
    id: 2,
    athlete: "Jane Smith",
    question: "What should I eat before a competition?",
    date: "2025-08-29",
  },
  {
    id: 3,
    athlete: "Alex Johnson",
    question: "How often should I rest during training?",
    date: "2025-08-28",
  },
];

export function AthleteQuestionsList() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Questions from Athletes</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-4">
          {fakeQuestions.map((q) => (
            <li key={q.id} className="border-b pb-2 last:border-b-0 last:pb-0">
              <div className="font-medium text-primary">{q.athlete}</div>
              <div className="text-base">{q.question}</div>
              <div className="text-xs text-muted-foreground">{q.date}</div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
