import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Block1() {
  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>Create your survey with Synthesize, and gather insights by conversing with our chatbot.</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
        How much time have you spent (let’s be honest: wasted) scrolling through endless Excel spreadsheets full of open-ended question data, trying to piece together new customer insights?
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>Create New Order</Button>
      </CardFooter>
    </Card>
  )
}
