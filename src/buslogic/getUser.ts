import { NewUser } from "@/interfaceTypes/types";
import { hashPassword } from "@/utils/encryption";

const getUser = async (user: NewUser) => {
    console.log("Fetching user from:", `${process.env.NEXT_PUBLIC_BASE_URL}/api/user?email=${user.email}&password=${user.password}`);

    try {
        // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user?email=${user.email}&password=${user.password}`)
        // const hashedPassword = await hashPassword(user.password);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/read`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user.email, password: user.password }),
        })

        if(!res.ok) {
            // console.log("Response is not ok!")
            // console.log(res)
            const data = await res.json();
            return data.error;
        } else {
            const data = await res.json();
            if (data.success) return JSON.stringify(data.user);
        }
        
    } catch (error) {
        console.error(error);
        return error;
    }
}

export default getUser;