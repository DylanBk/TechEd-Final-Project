import bcrypt from 'bcrypt';

export const encryptPw = async (pw: string) => {
    const rounds = 10;
    const salt = await bcrypt.genSalt(rounds) as string;
    const hash = await bcrypt.hashSync(pw, salt) as string;

    return hash;
};

export const checkPw = async (pw: string, hashPw: string) => {
    const res = await bcrypt.compare(pw, hashPw);

    return res;
};