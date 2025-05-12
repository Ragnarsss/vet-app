import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { saveClienteToLocalStorage } from "../../utils/localStorageCliente";
import "./LoginForm.css";
import { useLoginUser } from "./useLogin";
import { useVeterinarianAuth } from "@/context/useVeterinarianAuth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const vetLoginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

type VetLoginFormInputs = z.infer<typeof vetLoginSchema>;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const vetAuth = useVeterinarianAuth();
  const { loginUser, loading, error, success } = useLoginUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const vetForm = useForm<VetLoginFormInputs>({
    resolver: zodResolver(vetLoginSchema),
    mode: "onTouched",
  });

  const handleVetLogin = async (data: VetLoginFormInputs) => {
    await vetAuth.login(data.email, data.password);
    // Redirige solo si no hay error y hay sesión activa
    if (!vetAuth.error && vetAuth.veterinarian && vetAuth.authData) {
      navigate("/veterinarian");
    }
  };

  // Modal y recuperación de contraseña (sin cambios)
  const [isForgotPasswordVisible, setIsForgotPasswordVisible] =
    React.useState(false);
  const [step, setStep] = React.useState(1);
  const [recoveryEmail, setRecoveryEmail] = React.useState("");
  const [recoveryCode, setRecoveryCode] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [modalError, setModalError] = React.useState("");

  const onSubmit = async (data: LoginFormInputs) => {
    console.log("[Login] Datos enviados desde el formulario:", data);
    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });
      console.log("[Login] Respuesta exitosa:", response);
      // Accede correctamente a los datos anidados en loginUser
      const { customer, user, data: authData } = response.loginUser;
      saveClienteToLocalStorage(
        {
          id: String(customer.id),
          nombre: String(user.name),
          email: user.email,
          phone: customer.phone,
          address: customer.address,
        },
        String(authData.auth_token)
      );
      navigate("/client");
    } catch (e) {
      console.log("[Login] Error al iniciar sesión:", e);
    }
  };

  // Funciones de recuperación de contraseña (sin cambios, solo usan modalError)
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleForgotPassword = () => {
    setIsForgotPasswordVisible(true);
    setStep(1);
    setModalError("");
  };
  const handleSendRecoveryEmail = () => {
    if (!recoveryEmail) {
      setModalError("Por favor, ingresa tu correo.");
      return;
    }
    if (!isValidEmail(recoveryEmail)) {
      setModalError("Por favor, ingresa un correo válido.");
      return;
    }
    console.log("Enviando código de recuperación a:", recoveryEmail);
    setModalError("");
    setStep(2);
  };
  const handleValidateCode = () => {
    if (!recoveryCode) {
      setModalError("Por favor, ingresa el código de recuperación.");
      return;
    }
    console.log("Validando código:", recoveryCode);
    setModalError("");
    setStep(3);
  };
  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      setModalError("Por favor, completa todos los campos.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setModalError("Las contraseñas no coinciden.");
      return;
    }
    console.log("Restableciendo contraseña a:", newPassword);
    setModalError("");
    setIsForgotPasswordVisible(false);
  };

  return (
    <div className="login-container">
      <Tabs defaultValue="cliente" className="w-full max-w-md mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cliente">Cliente</TabsTrigger>
          <TabsTrigger value="veterinario">Veterinario</TabsTrigger>
        </TabsList>
        <TabsContent value="cliente">
          <Card className="login-card shadow-lg border border-gray-100 bg-gradient-to-br from-gray-50 to-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-700 text-xl font-bold text-center">
                Iniciar Sesión Cliente
              </CardTitle>
            </CardHeader>
            <CardContent>
              {error && <p className="error text-center mb-2">{error}</p>}
              {success && <p className="success text-center mb-2">{success}</p>}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-gray-800">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    {...register("email")}
                    placeholder="Ingresa tu correo"
                    disabled={loading}
                    className="focus:border-blue-400 focus:ring-blue-300"
                  />
                  {errors.email && (
                    <span className="error">{errors.email.message}</span>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password" className="text-gray-800">
                    Contraseña
                  </Label>
                  <Input
                    type="password"
                    id="password"
                    {...register("password")}
                    placeholder="Ingresa tu contraseña"
                    disabled={loading}
                    className="focus:border-blue-400 focus:ring-blue-300"
                  />
                  {errors.password && (
                    <span className="error">{errors.password.message}</span>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-blue-600" />{" "}
                    Recuérdame
                  </label>
                  <button
                    type="button"
                    className="text-blue-600 hover:underline"
                    onClick={handleForgotPassword}
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition"
                  disabled={loading}
                >
                  {loading ? "Iniciando..." : "Iniciar Sesión"}
                </Button>
              </form>
              <p className="register-link text-center mt-4">
                ¿No tienes una cuenta?{" "}
                <a href="/register" className="text-blue-600 hover:underline">
                  Regístrate aquí
                </a>
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="veterinario">
          <Card className="login-card shadow-lg border border-blue-100 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-700 text-xl font-bold text-center">
                Iniciar Sesión Veterinario
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={vetForm.handleSubmit(handleVetLogin)}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <Label htmlFor="vet-email" className="text-blue-800">
                    Correo electrónico
                  </Label>
                  <Input
                    id="vet-email"
                    type="email"
                    {...vetForm.register("email")}
                    placeholder="Ingresa tu correo"
                    disabled={vetAuth.loading}
                    className="focus:border-blue-400 focus:ring-blue-300"
                  />
                  {vetForm.formState.errors.email && (
                    <span className="error">
                      {vetForm.formState.errors.email.message}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="vet-password" className="text-blue-800">
                    Contraseña
                  </Label>
                  <Input
                    id="vet-password"
                    type="password"
                    {...vetForm.register("password")}
                    placeholder="Ingresa tu contraseña"
                    disabled={vetAuth.loading}
                    className="focus:border-blue-400 focus:ring-blue-300"
                  />
                  {vetForm.formState.errors.password && (
                    <span className="error">
                      {vetForm.formState.errors.password.message}
                    </span>
                  )}
                </div>
                {vetAuth.error && (
                  <div className="error text-center">{vetAuth.error}</div>
                )}
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition"
                  disabled={vetAuth.loading}
                >
                  {vetAuth.loading
                    ? "Ingresando..."
                    : "Ingresar como Veterinario"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {/* Modal para recuperación de contraseña */}
      {isForgotPasswordVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="modal-close-button"
              onClick={() => setIsForgotPasswordVisible(false)}
            >
              &times;
            </button>
            {step === 1 && (
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  Recuperar Contraseña
                </h2>
                <p className="mb-2">
                  Ingresa tu correo para enviar un código de recuperación.
                </p>
                <Input
                  type="email"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  placeholder="Ingresa tu correo"
                  className="mb-2"
                />
                {modalError && <p className="error">{modalError}</p>}
                <Button
                  onClick={handleSendRecoveryEmail}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition mt-2"
                >
                  Enviar Código
                </Button>
              </div>
            )}
            {step === 2 && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Validar Código</h2>
                <p className="mb-2">
                  Ingresa el código que recibiste en tu correo.
                </p>
                <Input
                  type="text"
                  value={recoveryCode}
                  onChange={(e) => setRecoveryCode(e.target.value)}
                  placeholder="Ingresa el código"
                  className="mb-2"
                />
                {modalError && <p className="error">{modalError}</p>}
                <Button
                  onClick={handleValidateCode}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition mt-2"
                >
                  Validar Código
                </Button>
              </div>
            )}
            {step === 3 && (
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  Restablecer Contraseña
                </h2>
                <p className="mb-2">Ingresa tu nueva contraseña.</p>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nueva contraseña"
                  className="mb-2"
                />
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repite la nueva contraseña"
                  className="mb-2"
                />
                {modalError && <p className="error">{modalError}</p>}
                <Button
                  onClick={handleResetPassword}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition mt-2"
                >
                  Restablecer Contraseña
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
