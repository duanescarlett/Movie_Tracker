'use server'
import getUser from '@/buslogic/getUser';
import bcrypt from 'bcrypt';
import { SignupFormSchema, FormState } from '@/lib/validations';
import { createSession } from '../sessions';

export async function signin(state: FormState, formData: FormData) {
    // Validate the form data
    const validationResult = SignupFormSchema.safeParse({
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
    const user = await getUser({ 
        email: formData.get('email')?.toString() || '',  
        password: hashedPassword || '', 
    });

    // Create session
    await createSession(user.id)
}