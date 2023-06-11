
import { NextApiRequest } from 'next';
import { NextAuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {ethers}  from "ethers";
import { redirect } from 'next/dist/server/api-utils';

export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        type: 'credentials',
        credentials: {
            message: {
              label: 'Message',
              placeholder: '0x0',
              type: 'text',
            },
            signature: {
              label: 'Signature',
              placeholder: '0x0',
              type: 'text',
            },
            address:{
                label: 'Address',
                placeholder: '0x0',
                type: 'text',
            },
            redirect:{
                type:'boolean',
                placeholder:'true',
            },
            callbackUrl:{
                type:'text',
                placeholder:`https://${process.env.NEXTAUTH_URL}/}`,
            }
          },
        //   @ts-ignore
        async authorize(credentials:any,req:NextApiRequest) {
          console.log("credentials",credentials)
          try {
            const address = credentials?.address as string;
            const message = credentials?.message as string; 
            const messageTimestamp = new Date(message).getTime(); // replace with actual message timestamp
            const currentTimestamp = Date.now();
            const differenceInMinutes = (currentTimestamp - messageTimestamp) / 60000; // divide by 60,000 to convert to minutes
            if (differenceInMinutes > 5) {
            console.log('Message was signed more than 5 minutes ago');
            return null;
            } 
            const signature = credentials?.signature as string;
            const recoveredAddress =  ethers.utils.verifyMessage(message, signature);
            const user:{name:string} = {
                name: address,
            };
      
            if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
              return user;
            }
          } catch (e) {
            return null;
          }
        },
      }),
    ],
  
    secret:'LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx6gts',
      callbacks: {
        async session({ session, token }: { session: Session; token: any }) {
            // console.log("session", session);
                  return { ...session, user: token };
              },
    },
      // https://next-auth.js.org/configuration/providers/oauth
      session: {
        strategy: 'jwt',
        maxAge: 8 * 60 * 60, // 8 hours
      },
      pages: {
        signIn: "/auth/signin",
        // error: '/auth/error',
        // signOut: '/auth/signout'
      },
    };

 