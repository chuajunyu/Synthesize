import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface FormOverviewProp {
  count: number;
  text: string;
}

export default function FormOverviewStatistics({ count, text }: FormOverviewProp) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>Form Statistics</CardDescription>
        <CardTitle className="text-4xl">{ count }</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">{ text }</div>
      </CardContent>
      <CardFooter>
        <Progress value={25} aria-label="25% increase" />
      </CardFooter>
    </Card>
  )
}
  