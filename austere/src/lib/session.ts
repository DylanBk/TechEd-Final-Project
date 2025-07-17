import 'server-only';
import { cookies } from 'next/headers';
import {SignJWT, jwtVerify} from 'jose';
import { SessionPayload } from '../../types/types';


const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);


// ENCRYPT/DECRYPT

export const encrypt = (payload: SessionPayload) => {
    return new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(encodedKey);
};

export const decrypt = async (session: string | undefined = '') => {
    try {
        const {payload} = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256']
        });

        return payload as SessionPayload;
    } catch (e) {
        console.error(`Error decrypting session: ${e}`);
        return null;
    };
};


// CRUD

export const createSession = async (userId: number) => {
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour
    const session = await encrypt({userId, expiresAt});
    const cookieStore = await cookies();
    
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: process.env.nodeEnv === ' production' ? true : false,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/'
    });

    console.log(`Created session: ${cookieStore.get('session')}`);
};

export const updateSessoin = async () => {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;
    const payload = await decrypt(session);

    if (!session || !payload) return null;

    const expiresAt = new Date(Date.now() + 3600000); // 1 hour

    cookieStore.set('session', session, {
        httpOnly: true,
        secure: process.env.nodeEnv === 'production' ? true : false,
        expires: expiresAt,
        sameSite: 'lax',
    });
};

export const deleteSession = async () => {
    const cookieStore = await cookies();

    cookieStore.delete('session');
};


// CHECK

export const checkSession = async () => {
    const cookieStore = await cookies();

    if (cookieStore.get('session')) {
        return true;
    } else {
        return false;
    };
};