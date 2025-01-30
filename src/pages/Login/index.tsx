import { Button, Paper, PasswordInput, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts";
import { LoginResponse } from "../../types";
import styles from "./index.module.scss";
import { useLogin } from "./queries";

export const Login = () => {
  const form = useForm({
    initialValues: { email: "admin@gmail.com", password: "admin123" },
    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Email is invalid",
    },
  });

  const { setAuthData, token } = useContext(AuthContext);

  const location = useLocation();

  const { mutateAsync } = useLogin();

  const pathname = location.state?.from?.pathname || "/";

  const handleSubmit = async () => {
    form.validate();
    if (form.isValid()) {
      const data: LoginResponse = await mutateAsync(form.values);

      setAuthData({
        accessToken: data.token,
        expiresIn: "1d",
      });
    }
  };

  if (token?.accessToken)
    return <Navigate to={pathname} state={{ from: location }} replace />;

  return (
    <div className={styles.wrapper}>
      <Paper className="bg-white shadow-lg p-6 rounded-lg w-full max-w-sm">
        <Title order={2} className={styles.title} ta="center" mt="md" mb={50}>
          Welcome to Furever Home!
        </Title>

        <TextInput
          placeholder="abc@example.com"
          label="Email"
          mb={14}
          type="email"
          size="md"
          {...form.getInputProps("email")}
        />

        <PasswordInput
          placeholder="Enter password"
          label="Password"
          size="md"
          {...form.getInputProps("password")}
        />

        <Button fullWidth onClick={handleSubmit} mt={24}>
          Login
        </Button>
      </Paper>
    </div>
  );
};
