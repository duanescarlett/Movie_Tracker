import { NewUser } from "@/interfaceTypes/types";
import logger from "@/services/logger";

// Initialize the logger instance
// const log = logger();

const getUser = async (user: NewUser) => {
    // log.info("Fetching user from:", `${process.env.NEXT_PUBLIC_BASE_URL}/api/user?email=${user.email}&password=${user.password}`);

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/read`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user.email, password: user.password }), // Send raw password
        });

        if (!res.ok) {
            const data = await res.json();
            return data.error;
        } else {
            const data = await res.json();
            if (data.success) return data.user; // Return the user object directly
        }
        
    } catch (error) {
        console.error(error);
        return error;
    }
}

export default getUser;