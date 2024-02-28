"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signInFormSchema } from "@/app/_helper-functions/types"
import { signInPost } from "@/app/_helper-functions/api"
 

 
export default function SignInForm() {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
 
  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    try {
        const res = await signInPost(values)
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            const { token, resource_owner } = data;
            console.log("Token:", token);
            console.log("User Information:", resource_owner);
          } else {

            throw new Error(`Failed to sign in: ${res.status}`);
          }
    } catch(e) {
        console.log(e)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-center">
            <Button type="submit" size='lg'>Submit</Button>
        </div>
      </form>
    </Form>
  )
}