'use server'
import getUser from '@/buslogic/getUser';
import bcrypt from 'bcryptjs';
import { SigninFormSchema, FormStateLog } from '@/lib/validations';
import { createSession } from '../sessions';

export async function signin(state: FormStateLog, formData: FormData) {
    // Validate the form data
    const validationResult = SigninFormSchema.safeParse({
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

    // Get user
    const user = await getUser({ 
        email: formData.get('email')?.toString() || '',  
        password: hashedPassword || '', 
    });

    // Create session
    await createSession(user.id)
}