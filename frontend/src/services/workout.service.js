import { tokenizeAxios } from "./axios"
import useSWR from 'swr';

const fetcher = url => tokenizeAxios.get(url).then(res => res.data)
class WorkoutService {
    useWorkoutPlans() {
        const { data, error, isValidating } = useSWR('/workout-plans', fetcher)
        return {
            data: data,
            isValidating: isValidating,
            isError: error
        }
    }  
}

export default new WorkoutService()