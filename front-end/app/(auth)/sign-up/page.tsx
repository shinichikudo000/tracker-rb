import FormContainer from "@/components/ui/FormContainer";
import SignUpForm from "./SignUpForm";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SignUpPage() {
    return (
        <FormContainer>
            <div className="font-header text-[2rem]">
                Task Tracker
            </div>
            <div className="w-full">
                <SignUpForm />
            </div>
            <Link href="/sign-in" className="underline underline-offset-1 text-sm mt-4">Already have an account?</Link>
        </FormContainer>
    )
}