import React, { useState } from "react";
import "./payment-form.css";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  Alert,
  Container,
  InputAdornment,
  IconButton,
  Stack,
} from "@mui/material";
import {
  CreditCard,
  Lock,
  Visibility,
  VisibilityOff
} from "@mui/icons-material";
import PaymentSuccess from "./payment-success";
import type { FormField, FormData, Errors } from "../interface/form";

const PaymentForm = () => {
  const [formData, setFormData] = useState<FormData>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [showCvv, setShowCvv] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleInputChange =
    (field: FormField) => (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value;

      if (field === "cardNumber") {
        value = value
          .replace(/\s/g, "")
          .replace(/(.{4})/g, "$1 ")
          .trim();
        if (value.length > 19) return;
      }

      if (field === "expiryDate") {
        value = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2");
        if (value.length > 5) return;
      }

      if (field === "cvv") {
        value = value.replace(/\D/g, "");
        if (value.length > 4) return;
      }

      setFormData((prev) => ({ ...prev, [field]: value }));

      if (errors[field]) {
        setErrors((prev: Errors) => ({ ...prev, [field]: "" }));
      }
    };

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!formData.cardNumber.trim())
      newErrors.cardNumber = "Número de tarjeta requerido";
    else if (formData.cardNumber.replace(/\s/g, "").length < 16)
      newErrors.cardNumber = "Número inválido";

    if (!formData.expiryDate.trim()) newErrors.expiryDate = "Fecha requerida";
    else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate))
      newErrors.expiryDate = "Formato MM/AA";

    if (!formData.cvv.trim()) newErrors.cvv = "CVV requerido";
    else if (formData.cvv.length < 3) newErrors.cvv = "CVV inválido";

    if (!formData.cardName.trim())
      newErrors.cardName = "Nombre del titular requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 1500);
  };

  if (paymentSuccess) {
     return <PaymentSuccess />;
  }

  return (
    <div className="payment-form">
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Card elevation={3} sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h5"
              component="h1"
              gutterBottom
              align="center"
              fontWeight="bold"
              textTransform="uppercase"
            >
              Pago con Tarjeta
              <div className="img_logo">
                <img src="/img/logo.png" alt="Tarjeta" />
              </div>
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Nombre del Titular"
                  value={formData.cardName}
                  onChange={handleInputChange("cardName")}
                  error={!!errors.cardName}
                  helperText={errors.cardName}
                  placeholder="Como aparece en la tarjeta"
                  required
                  variant="outlined"
                  size="medium"
                />

                <TextField
                  fullWidth
                  label="Número de Tarjeta"
                  value={formData.cardNumber}
                  onChange={handleInputChange("cardNumber")}
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber}
                  placeholder="1234 5678 9012 3456"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CreditCard color="action" />
                      </InputAdornment>
                    ),
                  }}
                  required
                  variant="outlined"
                  size="medium"
                />

                <Grid container spacing={2}>
                  <div>
                    <TextField
                      fullWidth
                      label="Vencimiento"
                      value={formData.expiryDate}
                      onChange={handleInputChange("expiryDate")}
                      error={!!errors.expiryDate}
                      helperText={errors.expiryDate}
                      placeholder="MM/AA"
                      required
                      variant="outlined"
                      size="medium"
                    />
                  </div>
                  <div>
                    <TextField
                      fullWidth
                      label="CVV"
                      type={showCvv ? "text" : "password"}
                      value={formData.cvv}
                      onChange={handleInputChange("cvv")}
                      error={!!errors.cvv}
                      helperText={errors.cvv}
                      placeholder="123"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowCvv(!showCvv)}
                              edge="end"
                              size="small"
                            >
                              {showCvv ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      required
                      variant="outlined"
                      size="medium"
                    />
                  </div>
                </Grid>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isProcessing}
                  fullWidth
                  sx={{
                    mt: 2,
                    py: 1.5,
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  {isProcessing ? "Procesando..." : "Pagar $1000 MXN"}
                </Button>
              </Stack>
            </Box>

            <Alert severity="info" sx={{ mt: 3,  fontWeight: "bold", justifyContent:'center'}} >
              Tus datos están protegidos.
            </Alert>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default PaymentForm;
