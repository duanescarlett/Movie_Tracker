import 'server-only'
import { JWTPayload, SignJWT, jwtVerify } from 'jose';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const key = new TextEncoder().encode(process.env.JWT_SECRET);
interface SessionPayload extends JWTPayload {}

type cookieType = {
    name?: string;
    duration?: number;
    options?: {
        httpOnly?: boolean;
        sameSite?: 'lax' | 'strict' | 'none' | boolean;
        secure?: boolean;
        path?: string;
    }; 
}
const cookie = {
    name: 'session',
    duration: 1000 * 60 * 60 * 24,
    options: {
        httpOnly: true,
        sameSite: 'lax' as 'lax' | 'strict' | 'none' | boolean | undefined,
        secure: true,
        path: '/',
    },
};
export async function encrypt(payload: JWTPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1day')
        .sign(key);
}

export async function decrypt(session: string): Promise<SessionPayload | null> {
    try {
        const { payload } = await jwtVerify(session, key, {
            algorithms: ['HS256'],
        });
        return payload as SessionPayload;
    } catch {
        return null;
    }
}

export async function createSession(userId: string) {
    const expires = new Date(Date.now() + cookie.duration);
    const session = await encrypt({ userId, expires });

    const cookieStore = await cookies();
    cookieStore.set(cookie.name, session, { 
        ...cookie.options,
     });
    // verifySession();
    redirect('/');
}

export async function verifySession() {
    const cookieStore = await cookies();
    const c: string = cookieStore.get(cookie.name)?.value || '';
    const session = await decrypt(c);
    if (!session?.userId) {
        redirect('/auth/sign-in');
    }
    return { isAuth: true, userId: Number(session.userId) };
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete(cookie.name);
    redirect('/sign-in');
}