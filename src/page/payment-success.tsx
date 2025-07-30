import { Container, Card, CardContent, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const PaymentSuccess = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Card elevation={3}>
        <CardContent sx={{ textAlign: "center", py: 6 }}>
          <CheckCircle sx={{ fontSize: 80, color: "success.main", mb: 2 }} />
          <Typography
            variant="h5"
            color="success.main"
            gutterBottom
            fontWeight="bold"
          >
            ¡Pago Exitoso!
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PaymentSuccess;
