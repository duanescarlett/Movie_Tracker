
const rateFilm = async (rating: number, userId: string, movieId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/rateFilm`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ rating: rating, userId: userId, movieId: movieId }),
        })

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

export default rateFilm;

