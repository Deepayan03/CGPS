import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import loginImage from "../../assets/download.png";
import { useState } from "react";
import { toast } from "sonner";
import axiosInstance from "@/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { loginDataType } from "@/types/authTypes";
import { Link } from "react-router-dom";
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
 
  const [loginData, setLoginData] = useState<loginDataType>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = loginData;
    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }
    setLoading(true);
    const response = await axiosInstance.post("/api/auth/login", loginData);
    console.log(response);
    if (response.status === 200) {
      setLoading(false);
      console.log("Login successful");
      navigate("/");
    } else {
      console.log("Login failed");
      toast.error("Login Failed");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <form className="p-6 md:p-8" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-sm font-bold">Welcome back</h1>
                    <p className="text-muted-foreground text-balance">
                      Login to your CGPS account
                    </p>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      onChange={handleChange}
                      name="email"
                      value={loginData.email}
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-2 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      onChange={handleChange}
                      value={loginData.password}
                      name="password"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant={"destructive"}
                    className="w-full"
                  >
                    {loading ? (
                      <div>
                        <span className="font-bold">Logging in...</span>
                      </div>
                    ) : (
                      "login"
                    )}
                  </Button>

                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link to={"/register"} className="underline underline-offset-4">
                      Sign up
                    </Link>
                  </div>
                </div>
              </form>
              <div className="relative hidden md:flex items-center justify-center w-full">
                <img src={loginImage} alt="Image" className="h-2/3 w-[80%]  " />
              </div>
            </CardContent>
          </Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
