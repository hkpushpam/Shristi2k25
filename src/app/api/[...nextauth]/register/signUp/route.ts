// ! Uncomment when this is in use or else keep in commented, this will create unnecessary error, until solved.
// ! This is the code containg Sending of the Verification code.
// import dbConnect from '@/lib/dbConnect';
// import UserModel from '@/model/userModel';
// import bcrypt from 'bcryptjs';
// // ! This part need to be un commented with verification code is to be sent.
// // import { sendVerificationEmail } from '@/helpers/sendVerificationEmail';

// export async function POST(request: Request) {
//   await dbConnect();

//   try {
//     const { email, password,name } = await request.json();

//     const existingUserByEmail = await UserModel.findOne({ email });
//     const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

//     if (existingUserByEmail) {
//       if (existingUserByEmail.isActive) {
//         return Response.json(
//           {
//             success: false,
//             message: 'User already exists with this email',
//           },
//           { status: 400 }
//         );
//       }
//       // ! This part need to be un commented with verification code is to be sent.
//       // } else {
//       //   const hashedPassword = await bcrypt.hash(password, 10);
//       //   existingUserByEmail.password = hashedPassword;
//       //   existingUserByEmail.verifyToken = verifyCode;
//       //   existingUserByEmail.verifyTokenExpiry = new Date(Date.now() + 3600000);
//       //   await existingUserByEmail.save();
//       // }
//     } else {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const expiryDate = new Date();
//       expiryDate.setHours(expiryDate.getHours() + 1);

//       const newUser = new UserModel({
//         email,
//         password: hashedPassword,
//         name,
//         isVerified: true, // ! This is to be set false with verification code is to be sent.
//         role: 'user',
//         forgotPasswordToken: ' ',
//         forgotPasswordTokenExpiry: new Date,
//         verifyToken: verifyCode,
//         verifyTokenExpiry: expiryDate,
//       });

//       await newUser.save();
//     }

//     // ! This part need to be un commented with verification code is to be sent.
//     // const emailResponse = await sendVerificationEmail(
//     //   email,
//     //   name,
//     //   verifyCode
//     // );
//     // if (!emailResponse.success) {
//     //   return Response.json(
//     //     {
//     //       success: false,
//     //       message: emailResponse.message,
//     //     },
//     //     { status: 500 }
//     //   );
//     // }
//     // ! Chane the below to 'User registered successfully. Please verify your account.'

//     return Response.json(
//       {
//         success: true,
//         message: 'User registered successfully. Please sign in to your account',
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('Error registering user:', error);
//     return Response.json(
//       {
//         success: false,
//         message: 'Error registering user',
//       },
//       { status: 500 }
//     );
//   }
// }

export {}; 

