import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface FormTitleAndDescriptionProps {
  title: string;
  description: string;
}

export default function FormTitleAndDescription({title, description}: FormTitleAndDescriptionProps) {
  return (
    <Card className="">
      <CardHeader className="pb-9">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>Chat with LLM to gather insights!</Button>
      </CardFooter>
    </Card>
  )
}
