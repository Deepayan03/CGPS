import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import { FormData } from "@/types/authTypes";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
export type Role = "student" | "recruiter";

export default function RegisterForm({
  className = "",
  ...props
}: { className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    role: "student",
    skills: [],
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // Validate form fields based on the backend requirements
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Validate common fields
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/))
      newErrors.email = "Invalid email format.";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";

    // Role-based validations
    if (formData.role === "recruiter") {
      if (!formData.companyName?.trim())
        newErrors.companyName = "Company Name is required.";
      if (!formData.industry?.trim())
        newErrors.industry = "Industry is required.";
    } else {
      if (!formData.rollNumber?.trim())
        newErrors.rollNumber = "Roll Number is required.";
      if (!formData.department?.trim())
        newErrors.department = "Department is required.";
      if (
        !formData.cgpa?.trim() ||
        isNaN(Number(formData.cgpa)) ||
        Number(formData.cgpa) < 0 ||
        Number(formData.cgpa) > 10
      )
        newErrors.cgpa = "CGPA must be between 0 and 10.";
      if (!formData.skills || formData.skills.length === 0)
        newErrors.skills = "At least one skill is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change; specially process "skills" into an array
  const handleChange = <K extends keyof FormData>(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "skills"
          ? value
              .split(",")
              .map((skill) => skill.trim())
              .filter(Boolean)
          : (value as FormData[K]),
    }));
  };

  // Handle form submission and send data via axiosInstance
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); // Reset errors on submit
    if (!validateForm()) return;

    try {
      const response = await axiosInstance.post("/api/auth/register", formData);
      console.log("Registration Successful:", response.data);
      toast.success("Registration Successful please login to continue");
      navigate("/login");
    } catch (error: any) {
     toast.error(
        "Registration Error:",
        error.response?.data || error.message
      );
      setErrors({
        apiError: error.response?.data?.message || "Something went wrong!",
      });
    }finally{
      setLoading(false);
    }
  };

  // Array of common fields
  const commonFields = [
    { label: "Full Name", name: "name", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password" },
    { label: "Address", name: "address", type: "text" },
  ];

  // Fields for students
  const studentFields = [
    { label: "Roll Number", name: "rollNumber", type: "text" },
    { label: "Department", name: "department", type: "text" },
    {
      label: "CGPA",
      name: "cgpa",
      type: "number",
      step: "0.1",
      min: "0",
      max: "10",
    },
    { label: "Skills (comma-separated)", name: "skills", type: "text" },
  ];

  // Fields for recruiters
  const recruiterFields = [
    { label: "Company Name", name: "companyName", type: "text" },
    { label: "Industry", name: "industry", type: "text" },
  ];

  return (
    <div
      className={cn("flex flex-col gap-6 items-center", className)}
      {...props}
    >
      <Card className="overflow-hidden p-0 shadow-lg w-full max-w-lg">
        <CardContent className="grid p-0">
          <form
            className="p-6 md:p-8 flex flex-col gap-6"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col items-center text-center">
              <h1 className="text-lg font-bold">Create an Account</h1>
              <p className="text-muted-foreground text-sm">
                {isRecruiter
                  ? "Register as a Recruiter"
                  : "Register as a Student"}
              </p>
            </div>

            {/* Role Toggle */}
            <div
              className={`flex justify-between items-center gap-4 px-4 py-2 rounded-lg ${
                isRecruiter ? "bg-blue-100" : "bg-gray-100"
              }`}
            >
              <span className="text-sm font-medium">Student</span>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                whileTap={{ scale: 0.8 }}
                className={`relative inline-flex items-center cursor-pointer w-14 h-8 ${
                  isRecruiter ? "bg-blue-600" : "bg-gray-300"
                } rounded-full`}
                onClick={() => {
                  setIsRecruiter(!isRecruiter);
                  setFormData((prev) => ({
                    ...prev,
                    role: !isRecruiter ? "recruiter" : "student",
                    // Reset role-specific fields when toggling
                    companyName: "",
                    industry: "",
                    rollNumber: "",
                    department: "",
                    cgpa: "",
                    skills: [],
                  }));
                  setErrors({});
                }}
              >
                <input
                  type="checkbox"
                  checked={isRecruiter}
                  className="sr-only peer"
                  readOnly
                />
                <motion.div
                  className="absolute top-1 left-1 h-6 w-6 bg-white rounded-full shadow-md"
                  animate={{ x: isRecruiter ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </motion.div>
              <span className="text-sm font-medium">Recruiter</span>
            </div>

            {/* Render common fields first */}
            <div className="grid gap-4">
              {commonFields.map((field) => (
                <div key={field.name} className="grid gap-2">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <Input
                    id={field.name}
                    type={field.type}
                    onChange={handleChange}
                    name={field.name}
                    value={formData[field.name as keyof FormData] || ""}
                  />
                  {errors[field.name] && (
                    <span className="text-red-500 text-sm">
                      {errors[field.name]}
                    </span>
                  )}
                </div>
              ))}

              {/* Render conditional fields based on role */}
              {formData.role === "recruiter"
                ? recruiterFields.map((field) => (
                    <div key={field.name} className="grid gap-2">
                      <Label htmlFor={field.name}>{field.label}</Label>
                      <Input
                        id={field.name}
                        type={field.type}
                        onChange={handleChange}
                        name={field.name}
                        value={formData[field.name as keyof FormData] || ""}
                      />
                      {errors[field.name] && (
                        <span className="text-red-500 text-sm">
                          {errors[field.name]}
                        </span>
                      )}
                    </div>
                  ))
                : studentFields.map((field) => (
                    <div key={field.name} className="grid gap-2">
                      <Label htmlFor={field.name}>{field.label}</Label>
                      <Input
                        id={field.name}
                        type={field.type}
                        onChange={handleChange}
                        name={field.name}
                        value={
                          field.name === "skills"
                            ? formData.skills?.join(", ") || ""
                            : formData[field.name as keyof FormData] || ""
                        }
                        {...(field.type === "number"
                          ? { step: field.step, min: field.min, max: field.max }
                          : {})}
                      />
                      {errors[field.name] && (
                        <span className="text-red-500 text-sm">
                          {errors[field.name]}
                        </span>
                      )}
                    </div>
                  ))}

              {errors.apiError && (
                <div className="text-center text-red-500 text-sm">
                  {errors.apiError}
                </div>
              )}

              <Button type="submit" variant="destructive" className="w-full">
                {loading?"Registering...":"Register"}
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
