import React, { useState } from "react";
import {NativeSyntheticEvent, TextInputChangeEventData} from "react-native";

export const useForm = (initialValues: Record<string, any>) => {
    const [form, setForm] = useState<typeof initialValues>(initialValues);

    const handleChange = (name: string) => (value: string) => {
        setForm((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return {
        form,
        handleChange,
    };
};