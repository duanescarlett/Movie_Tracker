import { NewUser } from "@/interfaceTypes/types";

const getUser = async (user: NewUser) => {
    // const user = await currentUser()
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/read`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })

        const data = await res.json();

        if (data.success) {
            return data.user;
        } else {
            return data.error;
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}

export default getUser;

    // try {
    //   const response = await fetch('/api/create', {
    //     method: 'POST',
    //     body: JSON.stringify(formData),
    //   });
    //   const result = await response.json();
    //   setMessage(result.message || 'Registration successful!');
    // } catch (error) {
    //   setMessage('Error submitting form');
    // }