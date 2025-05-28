"use client"

import { Alert, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { TriangleAlert } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Error (props: {error: Error, reset: () => void}) {
    const router = useRouter()
  return (
    <Alert>
        <TriangleAlert/>
        <div>
            <AlertTitle>Something went wrong!</AlertTitle>
            <Button onClick={props.reset}>Reset</Button>
            <Button onClick={() => router.back()}>Back</Button>  
        </div>
    </Alert>
  );
}