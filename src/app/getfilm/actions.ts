'use server'
import { FilmFinderSchema, FilmFinderLog } from '@/lib/validations';
import getFilmInfo from '@/buslogic/getFilmInfo'

export async function formAction(state: FilmFinderLog, formData: FormData) {
    // Validate the form data
    const validationResult = FilmFinderSchema.safeParse({
        title: formData.get('title'),
        // year: formData.get('year'),
        // plot: formData.get('plot'),
    })
    if (!validationResult.success) {
        return { 
            errors: validationResult.error.flatten().fieldErrors, 
        }
    }
    
    // Send the data to the API for the external http request
    // to get film info
    const filmData = await getFilmInfo({ title: formData.get('title')?.toString() || '' });
    console.log("This is the data from the presentation layer: ", filmData)
    
    // Write the data to the database
}