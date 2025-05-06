import { FilmType } from "@/interfaceTypes/types";
import logger from "@/services/logger";

// Initialize the logger instance
// const log = logger();

const getFilmInfo = async (film: FilmType) => {
    // const user = await currentUser()
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getstore`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: film.title, year: film?.year, plot: film?.plot }),
        })

        const data = await res.json();
        // log.info("This is the data from the business login layer: ", data);
        if (res.ok) {
            // data.user = user;
            return data;
        } else {
            return data.error;
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}

export default getFilmInfo;
