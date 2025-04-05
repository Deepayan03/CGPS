export type Role = "student" | "recruiter" | "admin";
export interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    address: string;
    role: Role;
    rollNumber?: string;
    department?: string;
    cgpa?: string;
    skills?: string[];
    companyName?: string;
    industry?: string;
  }

   export type loginDataType = {
      email: string;
      password: string;
    };
  
