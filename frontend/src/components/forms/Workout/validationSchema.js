import * as yup from 'yup';

export default 
    yup.object().shape({
        name: yup.string().required(),
        exercises: yup.array().min(1, "Pick at least 3 exercises").of(
            yup.object().shape({
                label: yup.string().required(),
                value: yup.string().required(),
            })
        )
    })
