'use server'
import createUser from '@/buslogic/createUser';
import bcrypt from 'bcryptjs';
import { SignupFormSchema, FormStateReg } from '@/lib/validations';
import { createSession } from '../sessions';

export async function signup(state: FormStateReg, formData: FormData) {
    // Validate the form data
    const validationResult = SignupFormSchema.safeParse({
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
    })
    if (!validationResult.success) {
        return { 
            errors: validationResult.error.flatten().fieldErrors, 
        }
    }
    
    // Hash the password 
    const hashedPassword = await bcrypt.hash(formData.get('password')?.toString() || '', 10);

    // Create user
    const user = await createUser({ 
        email: formData.get('email')?.toString() || '', 
        username: formData.get('username')?.toString() || '', 
        password: hashedPassword || '', 
    });

    // Create session
    // await createSession(user.id)
}