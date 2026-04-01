import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Info, Loader2, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import { CustomInput } from "./ui/CustomInput";

export function SignupForm({
  className,
  renderText,
  onChange,
  onSubmit,
  isRegister,
  formData,
  errors,
  authLoading,
  loginError,
  registerError,
}) {
  const backendErr = isRegister ? registerError : loginError;

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={onSubmit}>
      <FieldGroup className="w-full">
        <div className="flex flex-col gap-1 text-left">
          <h1 className="text-2xl font-bold">
            {renderText("Welcome back", "Create your account")}
          </h1>
          <p className="text-sm text-balance text-muted-foreground">
            {renderText(
              "Sign in to your developer account",
              "Start building your developer profile today",
            )}
          </p>
        </div>
        {backendErr && (
          <FieldDescription className="bg-[#fef2f3] text-red-500 p-4 rounded-2xl flex items-center gap-1.5">
            <span>
              <Info className="w-4 h-4" />
            </span>
            <span>{backendErr}</span>
          </FieldDescription>
        )}

        {isRegister && (
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <CustomInput
              id="name"
              type="text"
              placeholder="John Doe"
              name="name"
              value={formData.name}
              onChange={onChange}
              icon={User}
            />
            {errors?.name && (
              <FieldDescription className="text-red-500">
                {errors?.name}
              </FieldDescription>
            )}
          </Field>
        )}

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <CustomInput
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={onChange}
            icon={Mail}
          />
          {errors?.email && (
            <FieldDescription className="text-red-500">
              {errors?.email}
            </FieldDescription>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <CustomInput
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={onChange}
            icon={Lock}
          />
          {errors?.password && (
            <FieldDescription className="text-red-500">
              {errors?.password}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <Button type="submit" disabled={authLoading}>
            {isRegister ? (
              authLoading ? (
                <>
                  <Loader2 className={`animate-spin`} />
                  <span>Creating...</span>
                </>
              ) : (
                "Create Account"
              )
            ) : authLoading ? (
              <>
                <Loader2 className={`animate-spin`} />
                <span>Signing...</span>
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </Field>
        <FieldDescription className="px-6 text-center">
          {renderText(
            <>
              Don't have an account?{" "}
              <Link to={"/register"} className="text-primary">
                Create Account
              </Link>
            </>,
            <>
              Already have an account?{" "}
              <Link to={"/login"} className="text-primary">
                Sign in
              </Link>
            </>,
          )}
        </FieldDescription>
        {!isRegister && (
          <>
            <FieldSeparator>Or continue with</FieldSeparator>
            <Field orientation="horizontal" className="justify-center gap-3.5">
              <Button
                variant="outline"
                type="button"
                className="p-4 rounded-2xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                    fill="currentColor"
                  />
                </svg>
                Sign up with GitHub
              </Button>
              <Button
                variant="outline"
                type="button"
                className="p-4 rounded-2xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path
                    fill="#FFC107"
                    d="M43.611 20.083H42V20H24v8h11.303C33.663 32.657 29.2 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.963 3.037l5.657-5.657C33.982 6.053 29.27 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 13 24 13c3.059 0 5.842 1.154 7.963 3.037l5.657-5.657C33.982 6.053 29.27 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 44c5.104 0 9.772-1.951 13.295-5.142l-6.138-5.193C29.078 35.091 26.627 36 24 36c-5.18 0-9.632-3.317-11.287-7.946l-6.547 5.041C9.492 39.556 16.227 44 24 44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611 20.083H42V20H24v8h11.303c-.799 2.357-2.345 4.37-4.346 5.665l6.138 5.193C36.699 36.011 44 30.48 44 24c0-1.341-.138-2.65-.389-3.917z"
                  />
                </svg>
                Sign up with Google
              </Button>
            </Field>
          </>
        )}
      </FieldGroup>
    </form>
  );
}
