import crypto from "crypto";



export const formatDate = (raw?: Date) => {
    if (!raw) return '';
    const d = new Date(raw);
    return `${d.getFullYear().toString().slice(2)}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
};


// 문자열에 대한 hash value를 반환한다.
export const generateSaltedHash = (pw: string): string => {
	const pwSalt = process.env.PW_SALT;
	if (pwSalt === undefined) {
		throw Error("Enviroment error");
	}
	const hashedPassword: string = crypto.createHmac("sha3-512", pwSalt).update(pw).digest("hex");
	return hashedPassword;
};

// 입력된 문자열에 대한 hash value와 비교 대상이 같은지 일치여부를 반환한다.
export const compareSaltedHash = (pw: string, savedPasswordHash: string): boolean => {
	const pwSalt = process.env.PW_SALT;
	if (pwSalt === undefined) {
		throw Error("Enviroment error");
	}

	const hashedPassword: string = crypto.createHmac("sha3-512", pwSalt).update(pw).digest("hex");
	if (hashedPassword === savedPasswordHash) {
		return true;
	} else {
		return false;
	}
};
