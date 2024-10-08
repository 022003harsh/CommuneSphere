import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUserByEmail } from './actions/user.action';
import { LoginSchema } from './schema';

export default {
	providers: [
		Credentials({
			async authorize(credentials) {
				const validatedFields = LoginSchema.safeParse(credentials); // again doing validation
				if (validatedFields.success) {
					// if validation is successfull
					// FIXME: fetch password and check user
					const { email } = validatedFields.data;
					const user = await getUserByEmail(email); // checking if user is present in database
					if (!user || !user.password) return null; // password will be null when user has registered using google or github
					//   const passwordsMatch = await bcrypt.compare(password, user.password); // comparing the hashed password
					//   if (passwordsMatch) {
					//     return user;
					//   }

					return user;
				}

				return null;
			},
		}),
	],
} satisfies NextAuthConfig;
