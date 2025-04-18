// "use client";

// import { ApiResponse } from "@/types/ApiResponse";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import * as z from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/hooks/use-toast";
// import axios, { AxiosError } from "axios";
// import { Loader2 } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { signUpSchema } from "@/schemas/signUpSchema";

// export default function SignUpForm() {
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const router = useRouter();
//   const { toast } = useToast();

//   const form = useForm<z.infer<typeof signUpSchema>>({
//     resolver: zodResolver(signUpSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
//     setIsSubmitting(true);
//     try {
//       const response = await axios.post<ApiResponse>("/api/signUp", data);

//       toast({
//         title: "Success",
//         description: response.data.message,
//       });

//       router.replace("/signin");

//       setIsSubmitting(false);
//     } catch (error) {
//       console.error("Error during sign-up:", error);

//       const axiosError = error as AxiosError<ApiResponse>;

//       // Default error message
//       const errorMessage =
//         axiosError.response?.data.message ||
//         "There was a problem with fetching cars. Please try again.";

//       toast({
//         title: "Sign Up Failed",
//         description: errorMessage,
//         variant: "destructive",
//       });

//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-800">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//         <div className="text-center">
//           <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
//             Register
//           </h1>
//           <p className="mb-4">Sign up to start your anonymous adventure</p>
//         </div>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <FormField
//               name="name"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Name</FormLabel>
//                   <Input {...field} />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               name="email"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <Input
//                     {...field}
//                   />
//                   <p className="text-muted text-gray-400 text-sm">
//                     We will send you a verification code
//                   </p>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               name="password"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <Input type="password" {...field} name="password" />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button type="submit" className="w-full" disabled={isSubmitting}>
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Please wait
//                 </>
//               ) : (
//                 "Sign Up"
//               )}
//             </Button>
//           </form>
//         </Form>
//         <div className="text-center mt-4">
//           <p>
//             Already a member?{" "}
//             <Link href="/signin" className="text-blue-600 hover:text-blue-800">
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/userModel';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, password,name } = await request.json();

    const existingUserByEmail = await UserModel.findOne({ email });

    if (existingUserByEmail) {
      if (existingUserByEmail.isActive) {
        return Response.json(
          {
            success: false,
            message: 'User already exists with this email',
          },
          { status: 400 }
        );
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        email,
        password: hashedPassword,
        name,
        role: "user",
        credit_left: 20,
        credit_used: 0,
        isActive: true,
      });

      await newUser.save();
    }

    return Response.json(
      {
        success: true,
        message: 'User registered successfully. Please sign in to your account',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering user:', error);
    return Response.json(
      {
        success: false,
        message: 'Error registering user',
      },
      { status: 500 }
    );
  }
}


