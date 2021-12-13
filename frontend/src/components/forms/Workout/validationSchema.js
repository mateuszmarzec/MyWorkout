import * as yup from 'yup';

export default 
    yup.object().shape({
        name: yup.string().required(),
        exercises: yup.array().of(
            yup.object().shape({
                exercise: yup.string().required(),
        })
    )
})
