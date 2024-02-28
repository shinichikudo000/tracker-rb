import FormContainer from "@/components/ui/FormContainer";
import SignInForm from "./SignInForm";
import Link from "next/link";

export default function SignInPage() {
    return (
        <FormContainer>
            <div className="font-header text-[2rem]">
                Task Tracker
            </div>
            <div className="w-full">
                <SignInForm />
            </div>
            <Link href="/sign-up" className="underline underline-offset-1 text-sm mt-4">Create an account</Link>
        </FormContainer>
    )
}