import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
    const [form, setForm] = useState(initial);
    // const initialValues = Object.values(initial).join('');

    // useEffect(() => {
    //     // This function runs when the things we are watching change
    //     setInputs(initial);
    // }, [initialValues]);

    function handleChange(e) {
        let { value, name, type } = e.target;
        if (type === 'number') {
            value = parseInt(value);
        }
        if (type === 'file') {
            [value] = e.target.files;
        }
        setForm({
            ...form,
            [name]: value,
        });
    }

    function resetForm() {
        setForm(initial);
    }

    function clearForm() {
        const blankState = Object.fromEntries(
            Object.entries(form).map(([key, value]) => [key, ''])
        );
        setForm(blankState);
    }

    return {
        form,
        handleChange,
        resetForm,
        clearForm,
    };
}
