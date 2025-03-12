
const getOneFilm = async (title: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getonefilm?title=${title}`)

        const data = await res.json();
        // console.log("This is the data from the business login layer: ", data)
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

export default getOneFilm;
