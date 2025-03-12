'use client'
import { useActionState } from 'react'
import { formAction } from './actions'

const page = () => {
    const [state, action, pending] = useActionState(formAction, undefined)
    
    return (
        <div className="flex justify-center items-center h-screen">
            <form action={action} className="flex flex-row space-x-4">
                {state?.errors?.title && <p className="text-red-500 text-xs">{state.errors.title}</p>}
                <div className="flex flex-col items-center space-y-2">
                    <label htmlFor="title" className="w-20">Title:</label>
                    <input type="text" id="title" name="title" className="p-2 border rounded" />
                </div>
                {/* {state?.errors?.year && <p className="text-red-500 text-xs">{state.errors.year}</p>} */}
                {/* <div className="flex flex-col items-center space-y-2">
                    <label htmlFor="year" className="w-20">Year:</label>
                    <input type="text" id="year" name="year" className="p-2 border rounded" />
                </div> */}
                {/* {state?.errors?.plot && <p className="text-red-500 text-xs">{state.errors.plot}</p>} */}
                {/* <div className="flex flex-col items-center space-y-2">
                    <label htmlFor="plot" className="w-20">Plot:</label>
                    <select id="plot" name="plot" className="p-2 border rounded">
                    <option value="short">Short</option>
                    <option value="full">Full</option>
                    </select>
                </div> */}
                <button
                    disabled={pending}
                    type="submit"
                    className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-400">
                    { pending ? 'Processing...' : 'Request' }
                </button>
            </form>
        </div>
    )
}

export default page
