import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

interface Block1Props {
  title: string,
  text: string,
  showButton: boolean
  buttonText: string,
  href: string
}
export default function Block1({title , text, showButton, buttonText, href }: Block1Props) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="w-full">
        {text}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        { showButton &&
        <Link href={href}>
          <Button>{buttonText}</Button>
        </Link>
        }
      </CardFooter>
    </Card>
  )
}
