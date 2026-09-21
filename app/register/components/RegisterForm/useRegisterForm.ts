import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type FieldPath, type SubmitHandler } from "react-hook-form";
import { registerTeam } from "@/app/register/actions";
import { defaultValues, schema, type FormValues } from "./schema";

export const useRegisterForm = () => {
  const methods = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const result = await registerTeam(values);

    if ("fieldErrors" in result) {
      Object.entries(result.fieldErrors).forEach(([name, message]) => {
        methods.setError(name as FieldPath<FormValues> | "root", { message });
      });
      return;
    }

    methods.reset();
  };

  return {
    methods,
    handleSubmit: methods.handleSubmit(onSubmit),
  };
};
