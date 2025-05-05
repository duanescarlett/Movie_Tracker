import { FilmType } from "@/interfaceTypes/types";

const getAllFilms = async () => {
    // const user = await currentUser()
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getallfilms`)

        const data = await res.json();
        console.log("This is the data from the business login layer: ", data)
        if (res.ok) {
            return data;
        } else {
            return data.error;
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}

export default getAllFilms;
