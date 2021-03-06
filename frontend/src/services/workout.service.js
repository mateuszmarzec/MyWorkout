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
    useWorkoutPlan(slug) {
        const { data, error, isValidating } = useSWR(`/workout-plans/${slug}`, fetcher)
        return {
            data: data,
            isValidating: isValidating,
            isError: error
        }
    }
    useWorkoutActivities() {
        const { data, error, isValidating } = useSWR('/workout-activities', fetcher)
        return {
            data: data,
            isValidating: isValidating,
            isError: error
        }
    }
    useWorkoutActivity(slug) {
        const { data, error, isValidating } = useSWR(`/workout-activities/${slug}`, fetcher)
        return {
            data: data,
            isValidating: isValidating,
            isError: error
        }
    }
    async getExercises(name) {
        const response = await tokenizeAxios.get(`/exercises?search=${name}`);
        return response.data;
    }
    async addWorkoutPlan(data) {
        return await tokenizeAxios.post(`/add-workout-plans`, { ...data});
    }
    async addWorkoutActivity(data) {
        return await tokenizeAxios.post(`/add-workout-activities`, { ...data});
    }
    async addWorkoutExerciseSet(data) {
        return await tokenizeAxios.post(`/add-workout-exercise-set`, { ...data});
    }
    async updateWorkoutExerciseSet(id, data) {
        return await tokenizeAxios.put(`/workout-exercise-set/${id}`, { ...data});
    }
}

export default new WorkoutService()