import 'server-only';

import { db } from "@/config/config";
import { FormState } from "../../../types/types";
import { signupSchema, loginSchema } from "@/lib/schema";
import { encryptPw, checkPw } from "@/lib/password";
import { createSession, deleteSession } from "@/lib/session";

import { redirect } from "next/navigation";


export const signup = async (state: FormState, formData: FormData): Promise<FormState> => {
    try {
        const fields = signupSchema.safeParse(formData);
        console.log(state, formData)

        if (fields.success) {
            const hashPw = await encryptPw(fields.data.password);
            let q;

            if (fields.data.referralCode) {
                q = await db.query(
                    'INSERT INTO waiting_list (name, email, password, referral_code) VALUES (?, ?, ?)',
                    [fields.data.name, fields.data.email, hashPw, fields.data.referralCode]
                );
            } else {
                q = await db.query(
                    'INSERT INTO waiting_list (name, email, password VALUES (?, ?, ?',
                    [fields.data.name, fields.data.email, hashPw]
                );
            };

            if (q.rowCount && q.rowCount > 0) {
                redirect('/');
            } else {
                throw new Error('Failed to create user');
            };
        } else {
            throw new Error(`Validation error: ${JSON.stringify(fields.error.issues)}`);
        };
    } catch (e) {
        return {
            errors: {
                message: `Error signing up: ${(e instanceof Error ? e.message : String(e))}`
            }
        };
    };
};

export const login = async (FormData: FormData) => {
    try {
        const fields = loginSchema.safeParse(FormData);

        if (fields.success) {
            const q = await db.query(
                'SELECT * FROM users WHERE email = (?)',
                [fields.data.email]
            );

            if (q.rowCount && q.rowCount > 0) {
                const check = await checkPw(fields.data.password, q.rows[0].password);

                if (check) {
                    await createSession(q.rows[0].id);
                    redirect('/');
                } else {
                    throw new Error(`Invalid password for user with email: ${fields.data.email}`);
                };
            };
        } else {
            throw new Error(`Validation error: ${JSON.stringify(fields.error.issues)}`);
        };
    } catch (e) {
        return {
            errors: {
                message: `Error logging in: ${e instanceof Error ? e.message : String(e)}`
            }
        };
    };
};

export const logout = async () => {
    await deleteSession();
    redirect('/login');
}