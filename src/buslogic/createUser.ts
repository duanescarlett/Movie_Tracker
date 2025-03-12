import { NewUser } from "@/interfaceTypes/types";

const createUser = async (user: NewUser) => {
    // const user = await currentUser()
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user.email, username: user.username, password: user.password }),
        })

        const data = await res.json();

        if (data.success) {
            data.user = user;
            return data;
        } else {
            return data.error;
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}

export default createUser;
